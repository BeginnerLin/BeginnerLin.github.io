// JustBeginner 230611

/* 更新信息 Updata Info 
  hans-CN 手动回滚至初代代码
  en-UK Manually rolling back to the first generation code.
*/

/* 动态 Trends
  6月底将重构代码
> 已经写了一半了但是人懒[Doge]
*/

/* 已知漏洞 Bugs
 #1 [已修复]
 #2 输入的数据有误（为空），仍会生成（错误的）NBT。
 #3 “已复制” 按钮无效
*/

 //创建引用
 const echantedList = document.getElementById('echanted-list');
 const echantedAddLast = document.getElementById('echanted-add-last');
 const echantedRemoveLast = document.getElementById('echanted-remove-last');
 const submitEchanted = document.getElementById('page-submit');
 const printEchanted = document.getElementById('page-print');

 const namespace = "minecraft:";

 var echantedReturn = '';

 //监听-在末尾增加魔咒组
 echantedAddLast.addEventListener('click',() => {
     if (echantedList.children.length < 38){

         const echantedGroup = document.createElement('div');
         const echantedInput = document.createElement('input');
             echantedInput.type = 'text';
             echantedInput.id = 'echanted-id';
             echantedInput.placeholder = '输入魔咒ID';
         const echantedLevel = document.createElement('input');
             echantedLevel.type = 'text';
             echantedLevel.id = 'echanted-level';
             echantedLevel.placeholder = '输入魔咒等级';
         const echantedAdd = document.createElement('button');
         const echantedAddText = document.createTextNode("+");
             echantedAdd.type = 'button';
             echantedAdd.id = 'echanted-add';
             echantedAdd.appendChild(echantedAddText); 
         const echantedRemove = document.createElement('button');
         const echantedRemoveText = document.createTextNode("−");
             echantedRemove.type = 'button';
             echantedRemove.id = 'echanted-remove';
             echantedRemove.appendChild(echantedRemoveText);

             echantedGroup.appendChild(echantedInput);
             echantedGroup.appendChild(echantedLevel);
             echantedGroup.appendChild(echantedAdd);
             echantedGroup.appendChild(echantedRemove);    

         echantedList.appendChild(echantedGroup);
         console.info("[INFO] Add Group in the Last");
     }else {
         window.alert("最多不能超过38条魔咒！");
         console.warn("[WARN] Fail to Add Group in the Last");
     }
 });

 //监听-在末尾删除魔咒组
 echantedRemoveLast.addEventListener('click',() => {
     if (echantedList.children.length > 1) {
         echantedList.removeChild(echantedList.lastChild);
         console.info("[INFO] Add Group in the Last");
     }else {
         window.alert("最少不能少于1条魔咒！");
         console.warn("[WARN] Fail to Remove Group in the Last");
     }
 });

 //委托-删除魔咒组
 echantedList.addEventListener('click', function(parentRemove) {
     const remove = parentRemove.target;

     if (remove.matches('#echanted-remove')) {
       const parentGroup = remove.parentNode;

       if (echantedList.children.length > 1) {
         parentGroup.remove();
         console.info("[INFO] Remove Group After Element");
       }else{
         window.alert("最少不能少于1条魔咒！");
         console.warn("[WARN] Fail to Remove Group After Element");
       }
     }
 });

 //委托-增加魔咒组
 echantedList.addEventListener('click', function(parentAdd) {
     const add = parentAdd.target;

     if (add.matches('#echanted-add')) {
       const parentGroup = add.parentNode.parentNode;
       const thisGroup = add.parentNode;

       const echantedGroup = document.createElement('div');
       const echantedInput = document.createElement('input');
         echantedInput.type = 'text';
         echantedInput.id = 'echanted-id';
         echantedInput.placeholder = '输入魔咒ID';
       const echantedLevel = document.createElement('input');
         echantedLevel.type = 'text';
         echantedLevel.id = 'echanted-level';
         echantedLevel.placeholder = '输入魔咒等级';
       const echantedAdd = document.createElement('button');
       const echantedAddText = document.createTextNode("+");
         echantedAdd.type = 'button';
         echantedAdd.id = 'echanted-add';
         echantedAdd.appendChild(echantedAddText); 
       const echantedRemove = document.createElement('button');
       const echantedRemoveText = document.createTextNode("−");
         echantedRemove.type = 'button';
         echantedRemove.id = 'echanted-remove';
         echantedRemove.appendChild(echantedRemoveText);
         echantedGroup.appendChild(echantedInput);
         echantedGroup.appendChild(echantedLevel);
         echantedGroup.appendChild(echantedAdd);
         echantedGroup.appendChild(echantedRemove);   

       if (echantedList.children.length < 38){
         parentGroup.insertBefore(echantedGroup,thisGroup.nextSibling);
         console.info("[INFO] Add Group After Element");
       }else {
         window.alert("最多不能超过38条魔咒！");
         console.warn("[WARN] Fail to Add Group After Element");
       }
     }
   });


 /* 委托-预先检查
 //红#FFC0CB 绿#CBFFCB 黄#FFFFC0
 echantedList.addEventListener('blur', function(checkInputId) {
   const checkId = checkInputId.target;

   if (checkInputId.target.tagName === "INPUT") {
     
     let InputId = checkInputId.target.value;

     if (InputId === "") {
       checkInputId.target.style.backgroundColor = "#FFC0C0"; //Red

     }else {
       checkInputId.target.style.backgroundColor = "#FFFFC0"; //Green

     }
   }

 }, true);
 */


 //函数-转换ID
 function conversion(Id){

   for (let i = 0; i < Id.length; i++){

     switch(Id[i]){

       case "横扫之刃":
       case "横扫":
         Id[i] = namespace+"sweeping";
         break;

       case "保护":
         Id[i] = namespace+"protection";
         break;

       case "火焰保护":
         Id[i] = namespace+"fire_protection";
         break;

       case "摔落缓冲":
         Id[i] = namespace+"feather_falling";
         break;

       case "爆炸保护":
         Id[i] = namespace+"blast_protection";
         break;

       case "弹射物保护":
         Id[i] = namespace+"projectile_protection";
         break;

       case "荆棘":
         Id[i] = namespace+"thorns";
         break;

       case "水下呼吸":
         Id[i] = namespace+"respiration";
         break;

       case "深海探索者":
         Id[i] = namespace+"depth_strider";
         break;

       case "水下速掘":
         Id[i] = namespace+"aqua_affinity";
         break;

       case "锋利":
         Id[i] = namespace+"sharpness";
         break;

       case "亡灵杀手":
       case "亡灵":
         Id[i] = namespace+"smite";
         break;

       case "节肢杀手":
       case "节肢":
         Id[i] = namespace+"bane_of_arthropods";
         break;

       case "击退":
         Id[i] = namespace+"knockback";
         break;

       case "火焰附加":
         Id[i] = namespace+"fire_aspect";
         break;

       case "抢夺":
       case "掠夺夺":
         Id[i] = namespace+"looting";
         break;

       case "效率":
         Id[i] = namespace+"efficiency";
         break;

       case "精准采集":
       case "精采":
       case "丝绸之触":
         Id[i] = namespace+"silk_touch";
         break;

       case "耐久":
         Id[i] = namespace+"unbreaking";
         break;

       case "时运":
         Id[i] = namespace+"fortune";
         break;

       case "力量":
         Id[i] = namespace+"power";
         break;

       case "冲击":
         Id[i] = namespace+"punch";
         break;

       case "火矢":
         Id[i] = namespace+"flame";
         break;

       case "无限":
         Id[i] = namespace+"infinity";
         break;

       case "海之眷顾":
         Id[i] = namespace+"luck_of_the_sea";
         break;

       case "饵钓":
         Id[i] = namespace+"lure";
         break;

       case "冰霜行者":
         Id[i] = namespace+"frost_walker";
         break;

       case "经验修补":
       case "经修":
         Id[i] = namespace+"mending";
         break;

       case "绑定诅咒":
         Id[i] = namespace+"binding_curse";
         break;

       case "消失诅咒":
         Id[i] = namespace+"vanishing_curse";
         break;

       case "穿刺":
         Id[i] = namespace+"impaling";
         break;

       case "激流":
         Id[i] = namespace+"riptide";
         break;

       case "忠诚":
         Id[i] = namespace+"loyalty";
         break;

       case "引雷":
         Id[i] = namespace+"channeling";
         break;

       case "多重射击":
         Id[i] = namespace+"multishot";
         break;

       case "穿透":
         Id[i] = namespace+"piercing";
         break;

       case "快速装填":
         Id[i] = namespace+"quick_charge";
         break;

       case "灵魂疾行":
         Id[i] = namespace+"soul_speed";
         break;

       case "迅捷潜行":
         Id[i] = namespace+"swift_sneak";
         break;

       default:
         Id[i] = namespace+"protection";
         console.warn("[WARN] Echanted ID Is Inexistent : " + Id[i]);

     };

   };

   return Id;
 };


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

   var userInputEchantedId = [];
   for (let i = 0; i < echantedList.children.length; i++) {

      const userInput = echantedList.children[i].children[0].value;

     if (userInput !== '') {

       userInputEchantedId.push(userInput);
     }else{

       window.alert("魔咒不能为空：第"+ ( i + 1 ) + "条魔咒id为空");
       console.warn("[WARN] Echanted ID Is Empty : " + i);
       break;
     }
   }
   console.log('[LOG] '+userInputEchantedId);


   var userInputEchantedLevel = [];
   for (let i = 0; i < echantedList.children.length; i++) {

     const userInput = echantedList.children[i].children[1].value;

     if (userInput !== '') {

       userInputEchantedLevel.push(userInput);
     }else{

       window.alert("魔咒不能为空：第"+ ( i + 1 ) + "条魔咒等级为空");
       console.warn("[WARN] Echanted Level Is Empty : " + i);
       break;
     }
   }
   console.log('[LOG] '+userInputEchantedLevel);

   userInputEchantedId = conversion(userInputEchantedId);
   console.log('[LOG] '+userInputEchantedId);

   echantedReturn = echantedPrint(userInputEchantedId,userInputEchantedLevel);
   console.log('[LOG] '+echantedReturn);

   //printEchanted.innerHTML=echantedReturn;
   printEchanted.innerHTML = '';
   const copyAdd = document.createElement('button');
   const copyText = document.createTextNode("已复制！"); //假按钮
     copyAdd.type = 'button';
     copyAdd.appendChild(copyText); 
   const pAdd = document.createElement('p');
   const pText = document.createTextNode(echantedReturn);
     pAdd.appendChild(pText); 

   printEchanted.appendChild(pAdd);
   printEchanted.appendChild(copyAdd);

   navigator.clipboard.writeText(echantedReturn);

  

 }); 
