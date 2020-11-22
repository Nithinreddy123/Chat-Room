class Room {
  constructor() {
    this.conn_pool = [];
  }

  addUser = (ws) => {
    this.conn_pool.push(ws);
    console.log(this.conn_pool.length)
    console.log("added user")
  };

  removeUser = (id) => {
    this.conn_pool=this.conn_pool.filter(item => item.id!=id)
    console.log(this.conn_pool)
    console.log("user removed")
  };

  broadCastMessage = (msg,id) => {
    const removed_curr_client=this.conn_pool.filter(item => item.id!=id)
      removed_curr_client.map(item => item.send(msg))
  }

}

module.exports = Room;
