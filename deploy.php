<?php
namespace Deployer;

require 'recipe/laravel.php';
require 'contrib/npm.php';
require 'recipe/deploy/rollback.php';

// Config

set('repository', 'git@github.com:josephajibodu/footypredict.git');
set('remote_user', 'josephajibodu');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', [
    'storage/app/private'
]);

// Hosts

host('162.0.231.177')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '/var/www/footypredict.app/html');

// Tasks

task('npm:build', function () {
    run('cd {{release_path}} && {{bin/npm}} run build');
});

task('deploy', [
    'deploy:prepare',
    'deploy:vendors',
    'npm:install',
    'npm:build',
    'artisan:storage:link',
    'artisan:config:cache',
    'artisan:route:cache',
    'artisan:view:cache',
    'artisan:event:cache',
    'artisan:migrate',
    'deploy:publish',
]);

// Hooks

after('deploy:failed', 'deploy:unlock');
