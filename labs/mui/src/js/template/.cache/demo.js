/*TMODJS:{"version":49,"md5":"401eae3964e063109637170b8592ffc8"}*/
template('demo',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,postList=$data.postList,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<section class="plugin_nav"> <ul> <li> <a href="javascript:;" id="J_scroll" class="superNav on">IScroll</a> </li> <li> <a href="javascript:;" id="J_swipe" class="superNav">Swipe</a> </li> </ul> </section> <section class="plugin_content" id="wrapper"> <section class="plugin_iscroll suberCon on"> ';
$each(postList,function($value,$index){
$out+=' <p>';
$out+=$escape($value);
$out+='</p> ';
});
$out+=' </section> <section class="swipe_wrap swipe suberCon" id=\'mySwipe\' style=\'max-width:300px;margin:0 auto;\'> <div class=\'swipe-wrap\'> <div><b>0</b></div> <div><b>1</b></div> <div><b>2</b></div> <div><b>3</b></div> <div><b>4</b></div> <div><b>5</b></div> <div><b>6</b></div> <div><b>7</b></div> <div><b>8</b></div> <div><b>9</b></div> <div><b>10</b></div> <div><b>11</b></div> <div><b>12</b></div> <div><b>13</b></div> <div><b>14</b></div> <div><b>15</b></div> <div><b>16</b></div> <div><b>17</b></div> <div><b>18</b></div> <div><b>19</b></div> <div><b>20</b></div> </div> </section> </section> ';
include('./public/footer');
return new String($out);
});