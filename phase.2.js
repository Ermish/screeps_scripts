var phase2 = {
    run: function(spawn, room) {
        console.log(`Beginning phase 1 for room ${room.name} spawn ${spawn.name}. `);
        
        if(spawn.spawning) { 
            console.log(`spawn ${spawn.name} is currently spawning ${spawn.spawning.name}`);
            return false;
        }
        
        var haveEnoughEnergyToSpawn = spawn.energy >= 200;
        
        //Build at least one upgrader
        var upgraders = _.filter(room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        
        if(haveEnoughEnergyToSpawn && upgraders.length < 1) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});        
            return false;
        }
        
        //Build at least one builder
        var builders = _.filter(room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);
        
        if(haveEnoughEnergyToSpawn && builders.length < 1) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});        
            return false;
        }
        
        return true;
    }
};

module.exports = phase2;