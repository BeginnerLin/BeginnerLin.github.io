//JustBeginner 230626

//创建引用
const echantedList = document.getElementById('echanted-list');
const echantedAddLast = document.getElementById('echanted-add-last');
const echantedRemoveLast = document.getElementById('echanted-remove-last');
const submitEchanted = document.getElementById('page-submit');
const printEchanted = document.getElementById('page-print');

const namespace = "minecraft:";

//魔咒列表
var enListEchanted = ['sweeping','protection','fire_protection','feather_falling','blast_protection'
,'projectile_protection','thorns','respiration','depth_strider','aqua_affinity'
,'sharpness','smite','bane_of_arthropods','knockback','knockback'
,'looting','efficiency','silk_touch','unbreaking','fortune'
,'power','punch','flame','infinity','luck_of_the_sea'
,'lure','frost_walker','mending','binding_curse','vanishing_curse'
,'impaling','riptide','loyalty','channeling','multishot'
,'piercing','quick_charge','soul_speed','swift_sneak'];

var hansListEchanted = ['横扫之刃','保护','火焰保护','摔落缓冲','爆炸保护'
,'弹射物保护','荆棘','水下呼吸','深海探索者','水下速掘'
,'锋利','亡灵杀手','节肢杀手','击退','火焰附加'
,'抢夺','效率','精准采集','耐久','时运'
,'力量','冲击','火矢','无限','海之眷顾'
,'饵钓','冰霜行者','经验修补','绑定诅咒','消失诅咒'
,'穿刺','激流','忠诚','引雷','多重射击'
,'穿透','快速装填','灵魂疾行','迅捷潜行'];

var echantedReturn = '';

var numError = false;
var numErrorCode = 0;
var numErrorReason = "格式正确";

var minLvl = -32768;
var maxLvl = 32767;

var maxEchanted = 999 ; //最大魔咒数量

//函数-下拉魔咒
function echantedGroupSelectAdd(text,value) {
  const echantedGroup = document.createElement('div'); //魔咒组
  const echantedSelect = document.createElement('select'); //下拉框

  for (let i = 0; i < enListEchanted.length; i++) {

    const option = document.createElement('option');
    option.text = text[i];
    option.value = value[i];

    echantedSelect.add(option);
  }

  const echantedLevel = document.createElement('input'); //数字输入框
  echantedLevel.type = 'number';
  echantedLevel.id = 'echanted-level';
  echantedLevel.valueAsNumber = 1;
  echantedLevel.placeholder = '输入魔咒等级';
  echantedLevel.required = true;
  echantedLevel.min = minLvl;
  echantedLevel.max = maxLvl;
  echantedLevel.style.backgroundColor = "#CBFFCB";
  const echantedButton = document.createElement('button'); //按钮
  echantedButton.type = 'button';
  echantedButton.id = 'echanted-button';
  const echantedError = document.createElement('p'); //错误提示文字
  echantedError.id = 'echanted-error';
  echantedError.style.color = '#00CC00';
  echantedError.innerHTML = "<-" + '格式正确';

  echantedGroup.appendChild(echantedSelect);
  echantedGroup.appendChild(echantedLevel);
  echantedGroup.appendChild(echantedButton);  
  echantedGroup.appendChild(echantedError);  

  echantedList.appendChild(echantedGroup);

};
//调用魔咒下拉按钮
echantedGroupSelectAdd(hansListEchanted,enListEchanted);

//魔咒按钮使用
echantedList.addEventListener('click', function(parent) {
  const elem = parent.target;

  if (elem.matches('#echanted-button')) {
    const isLastElement = elem.parentNode === elem.parentNode.parentNode.lastElementChild;

    if (isLastElement) { //按钮功能判断-添加
      if (echantedList.children.length < maxEchanted){ 
        echantedGroupSelectAdd(hansListEchanted,enListEchanted);
      }else {
        window.alert("最多不能超过" + maxEchanted+ "条魔咒！");
      }
    } else { //按钮功能判断-删除
      if (echantedList.children.length > 1) {
        if (confirm("是否要删除该魔咒组？\n> 确定后不可撤销！")) {
          elem.parentNode.remove();
        }
      }else{
        window.alert("最少不能少于1条魔咒！");
      }
    }
  }
});


//委托-预先检查
//红#FFC0CB 绿#CBFFCB 黄#FFFFC0
echantedList.addEventListener('blur', function(InputLvl) {
  const check = InputLvl.target;
  let value = check.valueAsNumber;
  
  if (check.matches('#echanted-level')) {
    numErrorReason = "格式正确";
    if (isNaN(value)) {
      check.style.backgroundColor = "#FFC0CB";
      numError = true;
      numErrorCode = 1;
      numErrorReason = "魔咒等级未输入";
      check.parentNode.lastElementChild.innerHTML = "<-" + numErrorReason;
      check.parentNode.lastElementChild.style.color = "#CC0000";
    }else if (value >= maxLvl || value <= minLvl) {
      check.style.backgroundColor = "#FFC0CB";
      numError = true;
      numErrorCode = 2;
      numErrorReason = "魔咒等级超过短整型极限";
      check.parentNode.lastElementChild.innerHTML = "<-" + numErrorReason;
      check.parentNode.lastElementChild.style.color = "#CC0000";
    }else if (value > 255 || value < 1) {
      check.style.backgroundColor = "#FFFFC0";
      numError = true;
      numErrorCode = 3;
      numErrorReason = "魔咒等级会被截断";
      check.parentNode.lastElementChild.innerHTML = "<-" + numErrorReason;
      check.parentNode.lastElementChild.style.color = "#CCCC00";
    }else if (!Number.isInteger(value)) {
      check.style.backgroundColor = "#FFC0CB";
      numError = true;
      numErrorCode = 4;
      numErrorReason = "魔咒等级不能为小数";
      check.parentNode.lastElementChild.innerHTML = "<-" + numErrorReason;
      check.parentNode.lastElementChild.style.color = "#CC0000";
    }else {
      check.style.backgroundColor = "#CBFFCB";
      numError = false;
      numErrorCode = 0;
      numErrorReason = "格式正确";
      check.parentNode.lastElementChild.innerHTML = "<-" + numErrorReason;
      check.parentNode.lastElementChild.style.color = "#00CC00";
    }
    
  }

}, true);


//函数-生成NBT
function echantedPrint(Id,Level){

  let print = "{Enchantments:[";
  
  if (Id.length == 1) {
    print += "{id:\"" + Id[0] + "\",lvl:" + Level[0] + "}";

  }else {
    print += "{id:\"" + Id[0] + "\",lvl:" + Level[0] + "}";
    for (let i = 1; i < Id.length; i++) {
      print += ",{id:\"" + Id[i] + "\",lvl:" + Level[i] + "}"
    }

  };
  print += "]}";

  return print;
};

//监听-点击按钮
submitEchanted.addEventListener('click', () => {
  let inputId = [];
  let inputLvl = [];
  
  if (!numError) {
    echantedReturn = '';
    for (let i = 0; i < echantedList.children.length; i++) {   
      inputId.push(echantedList.children[i].children[0].value);
      inputLvl.push(echantedList.children[i].children[1].valueAsNumber);
    }
    
    document.getElementById('page-print').innerHTML = echantedPrint(inputId,inputLvl);
    navigator.clipboard.writeText(echantedPrint(inputId,inputLvl));
    window.alert("已复制\n> 点击生成按钮再次复制")
  }else{
    window.alert('请检查您输入的参数')
    document.getElementById('page-print').innerHTML = "参数有误";
  }

});
