function ClozeCard (text, cloze) {
  this.verify = function() {
    if (text.toLowerCase().indexOf(cloze.toLowerCase()) === -1) {
      console.log('Error! "' + cloze + '" does not appear in "' + text + '". Try again and make sure the cloze appears in the full text (PS Its case sensitive)');
      return true;
    }
    return false;
  }
  this.cloze = cloze.toLowerCase();
  this.partial = text.replace(cloze, '...');
  this.fullText = text;
}

module.exports = ClozeCard;