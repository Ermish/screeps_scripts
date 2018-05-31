var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefense = require('role.defense');
var roleOffense = require('role.offense');


var phase1 = require('phase.1');

var constructionSiteCreator = require('constructionSiteCreator');


module.exports.loop = function () {

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    for(var roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        
        for(var spawnName in Game.spawns) {
          var spawn = Game.spawns[spawnName];
          
          if(Object.is(spawn.room, room)) {
                console.log(`Beginning loop for room ${roomName} spawn  ${spawn.name}. `);
                
                constructionSiteCreator.run(room, spawn);
                
                var isPhase1Complete = phase1.run(spawn, room);
                
                var hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
                var defense = _.filter(Game.creeps, (creep) => creep.memory.role == 'defense');
                
                if (hostileCreeps.length && defense.length < hostileCreeps.length) {
                    var name = 'Defense' + Game.time;
                    spawn.spawnCreep([MOVE, CARRY, WORK, TOUGH, TOUGH, ATTACK], name, {memory: {role: 'defense'}});
                }
                
                
                if(!isPhase1Complete) {
                    continue;
                }
          }
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'defense') {
            roleDefense.run(creep);
        }
    }
}