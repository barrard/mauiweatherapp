//objects

var box = {}

box.material = 'carboard'

cb = box.material;

cb; //'cadboard'

box.material = 'Titanium';

cb; // still equal 'cardboard' refrence by value

box['size'] = 'small';
box['quality'] = 'new';

box.size; // 'small'
box.quality; // 'new'

var key = 'size';
box[key] = 'small'
box['key'];
box['material'];//'titanium'

var key = 'quality';
box[key]
box['quality'];//'new'

var mats = function(){
    return 'material'
};
box[func()];//'titanium'


var size = function(){
    return 'size'
};
box[size()];//'small'

box[0] ='blow'
//"blow"
box['go'] ='bark'
//"bark"
box['!@#$%^&*()_'] ='test'
//"test"
box{
             'go': 'bark',
              '0': 'blow',
    '!@#$%^&*()_': 'test'
}
//using brackets
// box['string']
// box['!@#$']
// box[variable]
// box[numbers]
// box[expression]

var box = {}

//'material' is a variable
box['material'] = 'cardboard'

//'size' is an object
box['size'] = {
    'height': 2,
    'width': 80
};

//area is a method
box.area = function(){
    return box.size.width * box.size.height
}
// OBJECT LITTERALS

var box = {
    'size' : 9,
    '!@#$' : 'symboles',
    '1' : 'num',
    0:false,
    '1':true,
    '!@3 ^^':'funny symbols'
}

box.size
//9
box[size]
//undefined
box['size']
//9
box.0
//Uncaught SyntaxError: Unexpected number(…)._
box[0]
//false





