var roleDefense = {

 // MOVE, CARRY, WORK, TOUGH, TOUGH, ATTACK = 300 energy

 /** @param {Creep} creep **/
 run: function(creep) {
   var hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
   if (hostileCreeps.length && (creep.attack(hostileCreeps[0]) === ERR_NOT_IN_RANGE)) {
     creep.moveTo(hostileCreeps[0]);
   } else if (!hostileCreeps.length) {
     // If there are no more enemies to attack, turn into a harvester
     creep.memory.role = 'harvester';
   }
 }
};

module.exports = roleDefense;