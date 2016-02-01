module.exports = function AsciiTable(json)
{

    this.table = function(json){
        var keys = Object.keys(json[0]);
        var width = {};
        var buffer = '';

        for (var key in keys) {
            width[keys[key]] = String(keys[key]).length;
        }

        for (var row in json) {
            for (var data in json[row]) {
                width[data] = Math.max(width[data], String(json[row][data]).length);
            }
        }

        // draw 
        buffer += this.line(width);
        buffer += "\n | "
        for (var key in keys) {
            buffer += keys[key] + ( ' '.repeat(width[keys[key]] - String(keys[key]).length) ) + " | ";
        }
            
        buffer += this.line(width); 
        
        for (var row in json) {
            
            buffer += "\n | ";
            for (var data in json[row]) {

                buffer += String(json[row][data]) + ( ' '.repeat(width[data] - String(json[row][data]).length) ) + " | ";

            }
        }
        
        buffer += this.line(width); 
        return buffer;
    }
    
    this.line = function(widthArray){
        var line = "\n +";
        for (var size in widthArray) {
            line +=  ( '-'.repeat(widthArray[size]+2) ) + "+";
        }

        return line;
    }

    return this.table(json);
}