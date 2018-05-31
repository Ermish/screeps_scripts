var phase1 = {
    run: function(spawn, room) {
        console.log(`Beginning phase 1 for room ${room.name} spawn ${spawn.name}. `);
        
        if(spawn.spawning) { 
            console.log(`spawn ${spawn.name} is currently spawning ${spawn.spawning.name}`);
            return;
            // var spawningCreep = room.creeps[spawn.spawning.name];
            // Game.spawns['Spawn1'].room.visual.text(
            //     '🛠️' + spawningCreep.memory.role,
            //     Game.spawns['Spawn1'].pos.x + 1, 
            //     Game.spawns['Spawn1'].pos.y, 
            //     {align: 'left', opacity: 0.8});
        }
        
        var haveEnoughEnergyToSpawn = spawn.energy >= 200;
        
        var harvesters = _.filter(room.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        
    
        //Build minimum amount of harvesters
        if(haveEnoughEnergyToSpawn && harvesters.length < 4) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});        
            return;
        }
        
        //Build at least one upgrader
        var upgraders = _.filter(room.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        
        if(haveEnoughEnergyToSpawn && upgraders.length < 1) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});        
            return;
        }
        
        //Build at least one builder
        var builders = _.filter(room.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);
        
        if(haveEnoughEnergyToSpawn && builders.length < 1) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});        
            return;
        }
    }
};

module.exports = phase1;