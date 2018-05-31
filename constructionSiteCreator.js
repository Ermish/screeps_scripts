var constructionSiteCreator = {
    run: function(room, spawn) {
     var sources = room.find(FIND_SOURCES); // find source location
     
     console.log(`Checking construction sites for room: ${room.name}`);
     
     if(room.memory.roads == undefined) {
         room.memory.roads = [];
     }
     
     if(room.memory.extensions == undefined) {
         room.memory.extensions = [];
     }
     
     for (var idx in sources) {
         if (!room.memory.roads.includes(sources[idx].id)) {
            console.log(`Building road in room: ${room.name}.`);
             
            var path = spawn.pos.findPathTo(sources[idx].pos);
            for (var i = 0; i < path.length; i++) {
            
                room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
            }
              
            room.memory.roads.push(sources[idx].id);
        }      
        
        if(room.memory.extensions.includes(sources[idx].id)) {
            console.log(`Building extension in room: ${room.name}.`);
            
        }
     }
    }
};

module.exports = constructionSiteCreator;