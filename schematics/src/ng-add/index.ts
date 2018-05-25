import { Rule, SchematicContext, Tree, chain, noop } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {getProjectFromWorkspace, getWorkspace} from '../utils/devkit-utils/config';

import { Schema } from './schema';
import { addModuleImportToRootModule } from '../utils/ast';
import { addPackageToPackageJson } from '../utils/package';
import { popperVersion, ngxPopperVersion } from '../utils/lib-versions'

/** Add popper.js, angular-popper to package.json if not already present. */
function addPopperToPackageJson() {
  return (host: Tree, context: SchematicContext) => {
    addPackageToPackageJson(host, 'dependencies', 'popper.js', popperVersion);
    addPackageToPackageJson(host, 'dependencies', 'angular-popper', ngxPopperVersion);

    context.addTask(new NodePackageInstallTask());
    return host;
  };
}

/** Add browser popper module to app.module */
function addModuleImports(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(host, 'NgxPopper', 'angular-popper', project);

    return host;
  };
}

/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.momdule
 */
export default function(options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addPopperToPackageJson(),
    addModuleImports(options)
  ]);
}
