
function GetAboutSAM(){
  return gs.SAM.about;
}
function GetHelp(){
  return gs.SAM.help;
}
function GetShip(){
  var str ="";
  str+="Name: " + gs.ship.name;
  str+="\nType: "+ gs.ship.type;
  str+="\n\n" + gs.ship.about;
  return str;
}


let Rendevous_1 = new objective(1);
Rendevous_1.content = "Travel to sector 7,2 and investigate to understand what is going on";
let Rendevous_2 = new objective(2);
Rendevous_2.content = "Travel to the outpost and ask for more information about the Old Republic";
let Rendevous_3 = new objective(3);
Rendevous_3.content = "Find the Old Republic. The last known location for the Old Republic was 8,4";
let Rendevous_4 = new objective(4);
Rendevous_4.content = "Procure mining charges and remote detonators in exchange for decoding the data file.";
let Rendevous_5 = new objective(5);
Rendevous_5.content = "Get the mining charges and remote detonators from the smuggler. The smuggler is located in the northwestern sectors of the system";
let Rendevous_6 = new objective(6);
Rendevous_6.content = "Return the mining charges and remote detonators to the outpost";
let ExploreRendevous = new Quest();
ExploreRendevous.name = "Explore Rendevous";
ExploreRendevous.description = "The ship log indicated that I was headed for a rendevous with an unknown party in sector 7,2. I should go there to try and discover what is going on.";

ExploreRendevous.objectives.set(Rendevous_1.id,Rendevous_1);
ExploreRendevous.objectives.set(Rendevous_2.id,Rendevous_2);
ExploreRendevous.objectives.set(Rendevous_3.id,Rendevous_3);
ExploreRendevous.objectives.set(Rendevous_4.id,Rendevous_4);
ExploreRendevous.objectives.set(Rendevous_5.id,Rendevous_5);
ExploreRendevous.objectives.set(Rendevous_6.id,Rendevous_6);

ExploreRendevous.currentObjective = Rendevous_1;


let ActiveQuests = [];
ActiveQuests.push(ExploreRendevous);

GetActiveQuests = function (){
  return ActiveQuests;
};

class Location{
  constructor(name,x,y){
    //the name of the location
    this.name = name;
    //the curretn system that the location is part of
    this.system="Aegis";
    //the location to the north
    this.__north= "";
    //the location to the south
    this.__south = "";
    //the location to the east
    this.__east = "";
    //the location to the west
    this.__west = "";
    //what is found when you scan a location
    this.objects = [];
    //what can be seen in this location
    this.__look = "";
    //x-y pos
    this.pos = {
      "x":x,
      "y":y,
    };
  }
  registerEventHandler(type,func){
    document.addEventListener(type, func, false);
  }
  
  get look(){
    return this.__look;
  }
  set look(newLook){
    this.__look = newLook;
  }
  lookNorth(){
    if(this.__north !== "")
      return this.__north.look;
    return "nothing to see here...";
  }
  lookSouth(){
    if(this.__south !== "")
      return this.__south.look;
    return "nothing to see here...";
    
  }
  lookEast(){
    if(this.__ease !== "")
      return this.__east.look;
    return "nothing to see here...";
  }
  lookWest(){
    if(this.__west !== "")
      return this.__west.look;
    return "nothing to see here...";
    
  }
  scan(){
    return this.objects;
  }
  addObject(newObj){
    this.objects.push(newObj);
  }
  set north(newLocation){
    this.__north = newLocation;
    if(newLocation.south ==="")
      newLocation.south = this;
  }
  get north(){
    return this.__north;
  }
  set south(newLocation){
    this.__south = newLocation;
    if(newLocation.north==="")
      newLocation.north = this;
  }
  get south(){
    return this.__south;
  }
  set east(newLocation){
    this.__east = newLocation;
    if(newLocation.west ==="")
      newLocation.west = this;
  }
  get east(){
    return this.__east;
  }
  set west(newLocation){
    this.__west = newLocation;
    if(newLocation.east==="")
      newLocation.east = this;
  }
  get west(){
    return this.__west;
  }
  
}
class SpaceObject{
  constructor(name,canTake){
    this.name = name;
    this.canTake = canTake;
    this.details = "";
    this.dialog = null;
  }
}
function CurrentLocation(){
  return gs.currentLocation;
}
function MoveNorth(){
  if(gs.currentLocation.north!==""){
    gs.currentLocation = gs.currentLocation.north;
    return "Moved north";
  }
  return "Can't move further north...";
}
function MoveSouth(){
  if(gs.currentLocation.south !== ""){
    gs.currentLocation = gs.currentLocation.south;
    return "Moved south";
  }
  return "Can't move further south...";
}
function MoveEast(){
  if(gs.currentLocation.east !== ""){
    gs.currentLocation = gs.currentLocation.east;
    return "Moved east";
  }
  return "Can't move further east...";
}
MoveWest = function(){
  if(gs.currentLocation.west !==""){
    gs.currentLocation = gs.currentLocation.west;
    return "Moved west";
  }
  return "Can't move further west...";
};

GetLocation = function(){
  return "System: " + gs.currentLocation.system + "\nLocation: " + gs.currentLocation.name + "\nX: " + gs.currentLocation.pos.x + " Y: "+ gs.currentLocation.pos.y;
};
GetWhoami = function(){
  var str="";
  str += "Name: Cmdr. Scout Jones";
  str += "\nOccupation: Silent Service Pilot";
  str += "\nAge: 29";
  str += "\nBio: Flying ships since they were 19. Joined the Corps at 21. Fought in the Chronis Uprising with distinguished service.";
  str += "\nCurrent Mission: Unknown";
  return str;
};
class Log {
  constructor(title,date,corrupted){
    this.title = title;
    this.date = date;
    this.content="";
    this.read = false;
    if(corrupted === null) corrupted = false;
    this.corrupted = corrupted;
  }
  ReadLog()
  {
    if(!this.corrupted){
      this.read = true;
      return "Title: " + this.title + "\nDate: " + this.date + "\n\n" + this.content;
    }
    else{
      return "Cannot read contents of this log, the contents are corrupted... ";
    }
  }
}
DisplayLogs = function(){
  var str = "";
  str+= "=== Ship's Log ===\n\n";
  for(var i=0;i<Logs.length;i++){
    str+="\n"+ (i+1) + " - " + Logs[i].title;
  }
  return str;
};
ReadLog = function(index){
  if(index <= 0 || index > Logs.length){
    return "Invalid log entry " + index +". Please enter a vlaue between 1 and " + Logs.length;
  }
  return Logs[index-1].ReadLog();
};



/*Game Data*/

let Station_067 = new SpaceObject("station_067",false);
Station_067.dialog = StationDialog;
let Aegia = new Location("Aegia",5,10);
let Ferra = new Location("Ferra",5,11);
let AX1 = new Location("AX1",6,10);
AX1.look = "It's a shipyard, there are lots of ships...";
Ferra.look = "It's a moon!";
Aegia.look = "Aegia, the bustling center of the Aegis system. The planet is flecked with whisps of violet and teal clouds over land of deep green and wheat, and vast oceans of the deepest blue. AX1, a shipyard, is slightly to east of your view, humming with activity. Ferra, the Aegian moon, is just peeking over the horizon of Aegia, stone gray.";
Aegia.addObject(Station_067);
Aegia.north = Ferra;
Aegia.east = AX1;
let gs = new GameState(Aegia,[],{});
var Logs = [];
let log1 = new Log("First Entry","1 March 2132");
Logs.push(log1);
log1.content = "Just took off from the AX1 shipyards with this old AX1-C. Cargo is loaded and we are heading for the rendevous five clicks west of Aegia. Should be there in a few days.";
let log2 = new Log("Cargo Manifest","1 March 2132");
Logs.push(log2);
log2.content = "Remote Detonators qty: 5\nCX85 Mining Charge qty: 5\nV.2 Delivery Drones qty: 5\n\nCERTIFIED AX1 CARGO AGENT 634ATY";
let log3 = new Log("Orders","2 March 2132",true);
Logs.push(log3);
let log4 = new Log("@#$G $%^","@#$@GHF", true);
Logs.push(log4);
let log5 = new Log("Critical System Error","5 March 2132");
log5.content = "!!!SAM AUTOMATED MESSAGE!!!\nSystem reboot at 14:54:45.5656\n\nError Code: 34 - Power System Failure\nEnergy spike detected with external sensors. Signal indicates a high energy event. Power was diverted to life support systems.";
Logs.push(log5);


Ferra.registerEventHandler('move',triggerMoveToFerra);
Aegia.registerEventHandler('move',triggerMoveToAegia);
function triggerMoveToFerra(e)
{
  if(e.detail ==="Ferra")
    typeWriter("this was triggered by moving into the ferra location");
}
function triggerMoveToAegia(e)
{
  if(e.detail ==="Aegia")
    typeWriter("this was triggered by moving into the " + e.detail + " location");
}
function handleHello(param){
  if(param === undefined){
    return "can't establish connection to " + param;
  }
  let obj = gs.currentLocation.objects.find(function(e){ return e.name === param;});
  if(obj !== undefined){
    currentDialogMap = obj.dialog;
    process("station_1");
    return "Establishing comm link...\nConnected..."
  }
  else{
    return "can't establish connection to " + param;
  }
}


