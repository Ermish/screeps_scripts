var roleOffense = {

 // MOVE, TOUGH, ATTACK, ATTACK, ATTACK = 300 energy

 /** @param {Creep} creep **/
 run: function(creep) {
   var closestHostileSpawn = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
   if (closestHostileSpawn && (creep.attack(closestHostileSpawn) === ERR_NOT_IN_RANGE)) {
     creep.moveTo(closestHostileSpawn);
   }
 }
};

module.exports = roleOffense;
