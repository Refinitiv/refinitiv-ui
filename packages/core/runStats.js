const exec = require('child_process').exec;

function execute(command, callback){
    console.log(command);
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

execute('npm -v', function(value) {
    const npmVersion = parseInt(value.substr(0, 1));
    const noInstallCommand = (npmVersion > 6) ? "npx --no @elf/stats" : "npx --no-install @elf/stats";
    
    execute(noInstallCommand, function(result) { console.log(result) });
});