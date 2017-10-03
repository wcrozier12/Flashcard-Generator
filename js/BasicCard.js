function BasicCard(front, back) {
  this.front = front;
  this.back = back;
}

var firstPresident = new BasicCard(
    "Who was the first president of the United States?", "George Washington");

module.exports = BasicCard;