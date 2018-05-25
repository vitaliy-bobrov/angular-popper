import { SchematicsException, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { addImportToModule } from '../utils/devkit-utils/ast-utils';
import { InsertChange } from '../utils/devkit-utils/change';
import { Project } from '../utils/devkit-utils/config';
import { getAppModulePath } from '../utils/devkit-utils/ng-ast-utils';


/** Reads file given path and returns TypeScript source file. */
export function getSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find file for path: ${path}`);
  }
  const content = buffer.toString();
  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

/** Import and add module to root app module. */
export function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: Project) {
  const modulePath = getAppModulePath(host, project.architect.build.options.main);
  addModuleImportToModule(host, modulePath, moduleName, src);
}

/**
 * Import and add module to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to import
 * @param moduleName name of module to import
 * @param src src location to import
 */
export function addModuleImportToModule(
    host: Tree, modulePath: string, moduleName: string, src: string) {
  const moduleSource = getSourceFile(host, modulePath);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${modulePath}`);
  }

  const changes = addImportToModule(moduleSource, modulePath, moduleName, src);
  const recorder = host.beginUpdate(modulePath);

  changes.forEach((change) => {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  });

  host.commitUpdate(recorder);
}
