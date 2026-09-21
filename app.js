(() => {
  const SW=2048, SH=1154;
  const ITEM_PERIOD=8.2;          // one slot passes every 8.2 sec on both lanes
  const FRONT_DELAY_MS=30000;    // short hidden-loop buffer; actual return also includes slot cadence
  const MIN_GAP=20;

  const PRODUCTS=[
    {id:'new_01',plate:'assets/new_01_plate.webp',price:'assets/new_01_price.webp'},
    {id:'new_02',plate:'assets/new_02_plate.webp',price:'assets/new_02_price.webp'},
    {id:'new_03',plate:'assets/new_03_plate.webp',price:'assets/new_03_price.webp'},
    {id:'new_04',plate:'assets/new_04_plate.webp',price:'assets/new_04_price.webp'},
    {id:'new_05',plate:'assets/new_05_plate.webp',price:'assets/new_05_price.webp'},
    {id:'new_06',plate:'assets/new_06_plate.webp',price:'assets/new_06_price.webp'},
    {id:'new_07',plate:'assets/new_07_plate.webp',price:'assets/new_07_price.webp'},
    {id:'new_08',plate:'assets/new_08_plate.webp',price:'assets/new_08_price.webp'},
    {id:'new_09',plate:'assets/new_09_plate.webp',price:'assets/new_09_price.webp'},
    {id:'new_10',plate:'assets/new_10_plate.webp',price:'assets/new_10_price.webp'},
    {id:'new_11',plate:'assets/new_11_plate.webp',price:'assets/new_11_price.webp'},
    {id:'new_12',plate:'assets/new_12_plate.webp',price:'assets/new_12_price.webp'},
    {id:'new_13',plate:'assets/new_13_plate.webp',price:'assets/new_13_price.webp'},
    {id:'new_14',plate:'assets/new_14_plate.webp',price:'assets/new_14_price.webp'},
    {id:'new_15',plate:'assets/new_15_plate.webp',price:'assets/new_15_price.webp'},
    {id:'new_16',plate:'assets/new_16_plate.webp',price:'assets/new_16_price.webp'},
    {id:'new_17',plate:'assets/new_17_plate.webp',price:'assets/new_17_price.webp'},
    {id:'new_18',plate:'assets/new_18_plate.webp',price:'assets/new_18_price.webp'},
    {id:'new_19',plate:'assets/new_19_plate.webp',price:'assets/new_19_price.webp'},
    {id:'new_20',plate:'assets/new_20_plate.webp',price:'assets/new_20_price.webp'},
    {id:'new_21',plate:'assets/new_21_plate.webp',price:'assets/new_21_price.webp'},
    {id:'new_22',plate:'assets/new_22_plate.webp',price:'assets/new_22_price.webp'},
    {id:'new_23',plate:'assets/new_23_plate.webp',price:'assets/new_23_price.webp'},
    {id:'new_24',plate:'assets/new_24_plate.webp',price:'assets/new_24_price.webp'},
    {id:'new_25',plate:'assets/new_25_plate.webp',price:'assets/new_25_price.webp'},
    {id:'new_26',plate:'assets/new_26_plate.webp',price:'assets/new_26_price.webp'},
    {id:'new_27',plate:'assets/new_27_plate.webp',price:'assets/new_27_price.webp'},
    {id:'new_28',plate:'assets/new_28_plate.webp',price:'assets/new_28_price.webp'},
    {id:'new_29',plate:'assets/new_29_plate.webp',price:'assets/new_29_price.webp'},
    {id:'new_30',plate:'assets/new_30_plate.webp',price:'assets/new_30_price.webp'},
    {id:'new_31',plate:'assets/new_31_plate.webp',price:'assets/new_31_price.webp'},
    {id:'new_32',plate:'assets/new_32_plate.webp',price:'assets/new_32_price.webp'},
    {id:'new_33',plate:'assets/new_33_plate.webp',price:'assets/new_33_price.webp'},
    {id:'new_34',plate:'assets/new_34_plate.webp',price:'assets/new_34_price.webp'},
    {id:'new_35',plate:'assets/new_35_plate.webp',price:'assets/new_35_price.webp'},
    {id:'new_36',plate:'assets/new_36_plate.webp',price:'assets/new_36_price.webp'},
    {id:'new_37',plate:'assets/new_37_plate.webp',price:'assets/new_37_price.webp'},
    {id:'new_38',plate:'assets/new_38_plate.webp',price:'assets/new_38_price.webp'},
    {id:'new_39',plate:'assets/new_39_plate.webp',price:'assets/new_39_price.webp'},
    {id:'new_40',plate:'assets/new_40_plate.webp',price:'assets/new_40_price.webp'},
    {id:'new_41',plate:'assets/new_41_plate.webp',price:'assets/new_41_price.webp'},
    {id:'new_42',plate:'assets/new_42_plate.webp',price:'assets/new_42_price.webp'},
    {id:'new_43',plate:'assets/new_43_plate.webp',price:'assets/new_43_price.webp'},
    {id:'new_44',plate:'assets/new_44_plate.webp',price:'assets/new_44_price.webp'},
    {id:'new_45',plate:'assets/new_45_plate.webp',price:'assets/new_45_price.webp'},
    {id:'new_46',plate:'assets/new_46_plate.webp',price:'assets/new_46_price.webp'},
    {id:'new_47',plate:'assets/new_47_plate.webp',price:'assets/new_47_price.webp'},
    {id:'new_48',plate:'assets/new_48_plate.webp',price:'assets/new_48_price.webp'},
    {id:'new_49',plate:'assets/new_49_plate.webp',price:'assets/new_49_price.webp'},
    {id:'new_50',plate:'assets/new_50_plate.webp',price:'assets/new_50_price.webp'},
    {id:'new_51',plate:'assets/new_51_plate.webp',price:'assets/new_51_price.webp'},
    {id:'new_52',plate:'assets/new_52_plate.webp',price:'assets/new_52_price.webp'},
    {id:'new_53',plate:'assets/new_53_plate.webp',price:'assets/new_53_price.webp'},
    {id:'new_54',plate:'assets/new_54_plate.webp',price:'assets/new_54_price.webp'},
    {id:'new_55',plate:'assets/new_55_plate.webp',price:'assets/new_55_price.webp'}
  ];

  const PRODUCT_GEOMETRY={
    new_01:{plate:{w:1508,h:1043,pw:1196.0,cx:738.5,cy:705.5},price:{w:2048,h:1670,pw:1599.9,cx:997.9,cy:953.8}},
    new_02:{plate:{w:1508,h:1043,pw:1108.6,cx:754.2,cy:825.5},price:{w:2047,h:1735,pw:1482.3,cx:1018.4,cy:1113.7}},
    new_03:{plate:{w:1508,h:1043,pw:1003.0,cx:754.0,cy:825.5},price:{w:2048,h:1677,pw:1341.7,cx:1018.6,cy:1114.3}},
    new_04:{plate:{w:1508,h:1043,pw:1112.0,cx:753.5,cy:826.0},price:{w:2048,h:1744,pw:1487.5,cx:1018.0,cy:1115.0}},
    new_05:{plate:{w:1508,h:1043,pw:1083.5,cx:753.2,cy:829.5},price:{w:2048,h:1696,pw:1449.4,cx:1017.6,cy:1119.6}},
    new_06:{plate:{w:1509,h:1042,pw:1152.0,cx:730.5,cy:750.0},price:{w:2048,h:1665,pw:1540.0,cx:986.6,cy:1012.6}},
    new_07:{plate:{w:1508,h:1043,pw:1116.8,cx:753.1,cy:830.0},price:{w:2048,h:1720,pw:1493.9,cx:1017.4,cy:1120.3}},
    new_08:{plate:{w:1508,h:1043,pw:1017.0,cx:752.0,cy:801.0},price:{w:2048,h:1668,pw:1360.5,cx:1016.0,cy:1081.5}},
    new_09:{plate:{w:1508,h:1043,pw:1020.0,cx:752.5,cy:788.0},price:{w:2048,h:1654,pw:1364.5,cx:1016.6,cy:1064.1}},
    new_10:{plate:{w:1508,h:1043,pw:1050.0,cx:751.5,cy:812.0},price:{w:2048,h:1681,pw:1404.6,cx:1015.3,cy:1096.2}},
    new_11:{plate:{w:1508,h:1043,pw:1210.0,cx:729.5,cy:735.0},price:{w:2048,h:1678,pw:1618.6,cx:985.9,cy:993.2}},
    new_12:{plate:{w:1508,h:1043,pw:1084.0,cx:726.5,cy:774.0},price:{w:2048,h:1659,pw:1450.1,cx:981.9,cy:1045.4}},
    new_13:{plate:{w:1508,h:1043,pw:1023.8,cx:750.6,cy:773.1},price:{w:2048,h:1654,pw:1369.6,cx:1014.1,cy:1044.2}},
    new_14:{plate:{w:1508,h:1043,pw:1099.0,cx:757.0,cy:834.0},price:{w:2048,h:1733,pw:1470.2,cx:1022.7,cy:1125.7}},
    new_15:{plate:{w:1508,h:1043,pw:1139.0,cx:754.0,cy:836.0},price:{w:2048,h:1739,pw:1523.7,cx:1018.6,cy:1128.3}},
    new_16:{plate:{w:1509,h:1042,pw:1096.0,cx:722.5,cy:780.0},price:{w:2048,h:1652,pw:1465.2,cx:975.9,cy:1052.7}},
    new_17:{plate:{w:1508,h:1043,pw:1007.7,cx:748.6,cy:776.4},price:{w:2047,h:1627,pw:1347.4,cx:1011.0,cy:1048.1}},
    new_18:{plate:{w:1509,h:1042,pw:1056.6,cx:788.3,cy:876.0},price:{w:2048,h:1676,pw:1412.5,cx:1063.8,cy:1181.1}},
    new_19:{plate:{w:1508,h:1043,pw:1407.0,cx:755.0,cy:753.5},price:{w:2048,h:1791,pw:1882.2,cx:1020.0,cy:1018.0}},
    new_20:{plate:{w:1508,h:1043,pw:1173.0,cx:754.0,cy:806.0},price:{w:2048,h:1742,pw:1569.1,cx:1018.6,cy:1088.2}},
    new_21:{plate:{w:1508,h:1043,pw:1091.0,cx:753.0,cy:834.5},price:{w:2048,h:1706,pw:1459.5,cx:1017.3,cy:1126.3}},
    new_22:{plate:{w:1508,h:1043,pw:1103.7,cx:755.6,cy:804.7},price:{w:2048,h:1721,pw:1476.5,cx:1020.8,cy:1086.5}},
    new_23:{plate:{w:1508,h:1043,pw:1079.0,cx:747.0,cy:801.5},price:{w:2047,h:1686,pw:1442.7,cx:1008.8,cy:1081.7}},
    new_24:{plate:{w:1508,h:1043,pw:1094.0,cx:753.5,cy:851.0},price:{w:2048,h:1740,pw:1463.5,cx:1018.0,cy:1148.4}},
    new_25:{plate:{w:1508,h:1043,pw:1468.5,cx:752.8,cy:796.2},price:{w:1952,h:1778,pw:1872.4,cx:969.8,cy:1025.1}},
    new_26:{plate:{w:1508,h:1043,pw:1387.0,cx:754.0,cy:692.5},price:{w:2035,h:1714,pw:1843.6,cx:1012.2,cy:930.5}},
    new_27:{plate:{w:1508,h:1043,pw:1391.1,cx:754.1,cy:721.6},price:{w:2039,h:1755,pw:1852.8,cx:1014.3,cy:971.0}},
    new_28:{plate:{w:1508,h:1043,pw:1312.8,cx:750.1,cy:699.9},price:{w:2048,h:1732,pw:1756.1,cx:1013.4,cy:946.2}},
    new_29:{plate:{w:1312,h:1199,pw:1214.0,cx:655.5,cy:959.0},price:{w:1879,h:2048,pw:1712.6,cx:934.7,cy:1362.8}},
    new_30:{plate:{w:1346,h:1168,pw:1126.0,cx:672.5,cy:966.5},price:{w:1965,h:2048,pw:1619.2,cx:977.0,cy:1399.8}},
    new_31:{plate:{w:1508,h:1043,pw:1275.0,cx:761.0,cy:806.5},price:{w:2048,h:1792,pw:1705.6,cx:1028.0,cy:1088.9}},
    new_32:{plate:{w:1508,h:1043,pw:1052.0,cx:750.5,cy:801.5},price:{w:2048,h:1669,pw:1407.3,cx:1014.0,cy:1082.2}},
    new_33:{plate:{w:1508,h:1043,pw:962.4,cx:750.3,cy:801.6},price:{w:2047,h:1620,pw:1286.8,cx:1013.2,cy:1081.8}},
    new_34:{plate:{w:1508,h:1043,pw:1398.0,cx:753.5,cy:754.0},price:{w:2039,h:1755,pw:1861.9,cx:1013.5,cy:1014.2}},
    new_35:{plate:{w:1312,h:1199,pw:1279.6,cx:656.7,cy:906.7},price:{w:1872,h:2048,pw:1798.4,cx:933.0,cy:1284.3}},
    new_36:{plate:{w:1508,h:1043,pw:1139.7,cx:753.3,cy:818.6},price:{w:2048,h:1754,pw:1524.6,cx:1017.8,cy:1105.1}},
    new_37:{plate:{w:1508,h:1043,pw:1077.6,cx:749.3,cy:780.9},price:{w:2048,h:1681,pw:1441.6,cx:1012.4,cy:1054.6}},
    new_38:{plate:{w:1508,h:1043,pw:1106.0,cx:753.5,cy:834.5},price:{w:2047,h:1730,pw:1478.8,cx:1017.5,cy:1125.8}},
    new_39:{plate:{w:1508,h:1043,pw:1423.0,cx:754.0,cy:754.0},price:{w:1984,h:1723,pw:1844.1,cx:987.1,cy:987.1}},
    new_40:{plate:{w:1508,h:1043,pw:1108.0,cx:754.5,cy:811.0},price:{w:2048,h:1736,pw:1482.2,cx:1019.3,cy:1094.9}},
    new_41:{plate:{w:1508,h:1043,pw:1127.0,cx:753.0,cy:800.5},price:{w:2048,h:1708,pw:1507.6,cx:1017.3,cy:1080.8}},
    new_42:{plate:{w:1508,h:1043,pw:1122.0,cx:744.5,cy:776.5},price:{w:2048,h:1693,pw:1500.9,cx:1005.9,cy:1048.7}},
    new_43:{plate:{w:1312,h:1199,pw:1263.5,cx:656.2,cy:940.5},price:{w:1805,h:2048,pw:1712.2,cx:899.3,cy:1284.5}},
    new_44:{plate:{w:1508,h:1043,pw:1134.8,cx:753.9,cy:793.4},price:{w:2048,h:1738,pw:1518.1,cx:1018.5,cy:1071.4}},
    new_45:{plate:{w:1312,h:1199,pw:1261.0,cx:657.0,cy:942.5},price:{w:1844,h:2048,pw:1745.7,cx:919.6,cy:1314.8}},
    new_46:{plate:{w:1508,h:1043,pw:1406.0,cx:755.5,cy:717.5},price:{w:2016,h:1709,pw:1851.4,cx:1004.9,cy:954.8}},
    new_47:{plate:{w:1509,h:1042,pw:1100.7,cx:754.5,cy:812.8},price:{w:2048,h:1712,pw:1493.9,cx:1024.0,cy:1112.8}},
    new_48:{plate:{w:1312,h:1199,pw:957.0,cx:656.0,cy:935.2},price:{w:1990,h:2048,pw:1451.6,cx:995.0,cy:1331.2}},
    new_49:{plate:{w:1508,h:1043,pw:1100.0,cx:754.0,cy:813.5},price:{w:2048,h:1724,pw:1493.9,cx:1024.0,cy:1120.6}},
    new_50:{plate:{w:1312,h:1199,pw:957.0,cx:656.0,cy:935.2},price:{w:1993,h:2048,pw:1453.8,cx:996.5,cy:1331.2}},
    new_51:{plate:{w:1312,h:1199,pw:957.0,cx:656.0,cy:935.2},price:{w:1883,h:2048,pw:1373.5,cx:941.5,cy:1331.2}},
    new_52:{plate:{w:1508,h:1043,pw:1100.0,cx:754.0,cy:813.5},price:{w:2048,h:1720,pw:1493.9,cx:1024.0,cy:1118.0}},
    new_53:{plate:{w:1508,h:1043,pw:1100.0,cx:754.0,cy:813.5},price:{w:2048,h:1725,pw:1493.9,cx:1024.0,cy:1121.2}},
    new_54:{plate:{w:1508,h:1043,pw:1100.0,cx:754.0,cy:813.5},price:{w:2048,h:1720,pw:1493.9,cx:1024.0,cy:1118.0}},
    new_55:{plate:{w:1508,h:1043,pw:1100.0,cx:754.0,cy:813.5},price:{w:2048,h:1734,pw:1493.9,cx:1024.0,cy:1127.1}},
  };
  const TARGET_PLATE=1100;

  const defs=[
    {name:'back',el:document.getElementById('backLane'),y:431,h:129,count:7,dir:1,src:'assets/belt_back.png'},
    {name:'front',el:document.getElementById('frontLane'),y:771,h:223,count:5,dir:-1,src:'assets/belt_front.webp'}
  ];

  function cover(){
    const s=Math.max(innerWidth/SW,innerHeight/SH);
    const w=SW*s,h=SH*s;
    return {s,w,h,x:(innerWidth-w)/2,y:(innerHeight-h)/2};
  }
  function mod(n,m){ return ((n%m)+m)%m; }

  // Keeps at least six other products between repeats in newly generated back stock.
  function makePicker(){
    const recent=[];
    return ()=>{
      const blocked=new Set(recent.slice(-MIN_GAP));
      const pool=PRODUCTS.filter(p=>!blocked.has(p.id));
      const p=pool[Math.floor(Math.random()*pool.length)];
      recent.push(p.id);
      if(recent.length>MIN_GAP) recent.shift();
      return p;
    };
  }

  const pickBack=makePicker();
  const pickHistory=makePicker();

  // Products that have left the back lane. They become eligible on front after 60 sec.
  const delayedQueue=[];

  const states=defs.map(d=>{
    const strip=d.el.querySelector('.belt-strip');
    const beltImgs=[];
    for(let i=0;i<3;i++){
      const im=new Image();
      im.src=d.src;
      strip.appendChild(im);
      beltImgs.push(im);
    }

    const productsEl=d.el.querySelector('.products');
    const items=[];
    // Large off-screen buffers. Slot count stays fixed forever.
    for(let i=0;i<d.count+8;i++){
      const el=document.createElement('div');
      el.className='product';
      const img=new Image();
      img.alt='';
      img.className='product-art';
      el.appendChild(img);

      // Front-lane hover fit image. Hidden until the pointer is over the product.
      const quality=new Image();
      quality.alt='';
      quality.className='fit-tag';
      quality.draggable=false;
      el.appendChild(quality);

      productsEl.appendChild(el);
      items.push({el,img,quality,product:null,x:0});
    }

    return {...d,strip,beltImgs,items,offset:0,spacing:1,tileW:1,speed:1,initialized:false};
  });

  const back=states.find(s=>s.name==='back');
  const front=states.find(s=>s.name==='front');

  function setProduct(state,item,p){
    item.product=p;
    item.el.dataset.productId=p.id;
    item.img.src=state.name==='back' ? p.plate : p.price;
    if(item.quality){
      if(state.name==='front'){
        item.quality.src=`assets/${p.id}_fit.png`;
        item.quality.alt=`${p.id} 着用イメージ`;
      }else{
        item.quality.removeAttribute('src');
        item.quality.alt='';
      }
    }
    const kind=state.name==='back' ? 'plate' : 'price';
    const geo=PRODUCT_GEOMETRY[p.id]?.[kind];
    // Normalize the visible plate, not the outer image canvas.
    const referenceCanvas=1508;
    const norm=(geo ? (TARGET_PLATE/geo.pw)*(geo.w/referenceCanvas) : 1);
    item.img.style.setProperty('--plate-normalize',norm.toFixed(4));
    // Wave Vase: keep the previously tuned slight forward offset on the back lane.
    item.img.style.bottom=(state.name==='back' && p.id==='new_48') ? '-2%' : '';
    item.img.dataset.geometryKind=kind;
    if(state.name==='front' && typeof warmCart==='function') warmCart(p);
  }

  // Warm only products that can actually be clicked soon. Decoding every cart image
  // at startup caused a short CPU/memory spike and could make the first click feel late.
  const cartImageCache=new Map();
  function warmCart(p){
    if(!p || cartImageCache.has(p.id)) return;
    const img=new Image();
    img.decoding='async';
    img.src=`assets/${p.id}_cart.webp`;
    cartImageCache.set(p.id,img);
    if(img.decode) img.decode().catch(()=>{});
  }
  front.items.forEach(it=>warmCart(it.product));

  // Startup stock: both lanes begin full. After ~60 sec, front is fed by the real back queue.
  back.items.forEach(it=>setProduct(back,it,pickBack()));
  front.items.forEach(it=>setProduct(front,it,pickHistory()));

  const cartSeWarmup=document.getElementById('cartAddSe');
  if(cartSeWarmup) cartSeWarmup.load();

  const orderSlots=document.getElementById('orderSlots');
  function addToOrderTray(item){
    if(!item.product) return;
    orderSlots.querySelector('.empty-order')?.remove();
    const slot=document.createElement('div');
    slot.className='order-item';
    const cached=cartImageCache.get(item.product.id);
    const img=cached ? cached.cloneNode(false) : document.createElement('img');
    if(!cached) img.src=`assets/${item.product.id}_cart.webp`;
    img.alt='注文商品';
    slot.appendChild(img);
    orderSlots.appendChild(slot);
    while(orderSlots.querySelectorAll('.order-item').length>3) orderSlots.querySelector('.order-item').remove();
    item.el.classList.remove('picked');
    void item.el.offsetWidth;
    item.el.classList.add('picked');
    setTimeout(()=>item.el.classList.remove('picked'),260);
  }
  front.items.forEach(it=>it.el.addEventListener('click',()=>addToOrderTray(it)));

  const frontRecent=front.items.map(it=>it.product?.id).filter(Boolean).slice(-MIN_GAP);
  function rememberFront(p){
    if(!p) return p;
    frontRecent.push(p.id);
    while(frontRecent.length>MIN_GAP) frontRecent.shift();
    return p;
  }
  function nextFrontProduct(now){
    const blocked=new Set(frontRecent);
    // Prefer due products from the real back-lane queue, but never repeat anything
    // shown among the previous 20 front-lane products.
    const idx=delayedQueue.findIndex(q=>q.readyAt<=now && !blocked.has(q.product.id));
    if(idx>=0) return rememberFront(delayedQueue.splice(idx,1)[0].product);
    const pool=PRODUCTS.filter(p=>!blocked.has(p.id));
    const p=pool[Math.floor(Math.random()*pool.length)] || pickHistory();
    return rememberFront(p);
  }

  function layout(){
    const g=cover();

    // One shared 2048x1154 stage for background + order monitor + logos.
    // Everything receives the same cover scale and the same x/y offset.
    const scene=document.getElementById('scene');
    scene.style.setProperty('--stage-scale',g.s);
    scene.style.setProperty('--stage-w',`${g.w}px`);
    scene.style.setProperty('--stage-h',`${g.h}px`);
    const bgmToggle=document.getElementById('bgmToggle');
    if(bgmToggle){const bx=1540,by=158,bw=104,bh=40;bgmToggle.style.setProperty('--bgm-left',`${g.x+bx*g.s}px`);bgmToggle.style.setProperty('--bgm-top',`${g.y+by*g.s}px`);bgmToggle.style.setProperty('--bgm-width',`${bw*g.s}px`);bgmToggle.style.setProperty('--bgm-height',`${bh*g.s}px`);}


    const background=document.getElementById('background');
    background.style.left=`${g.x}px`;
    background.style.top=`${g.y}px`;
    background.style.width=`${g.w}px`;
    background.style.height=`${g.h}px`;

    // Design-space geometry on the original 2048x1154 artwork.
    // Tuned directly against the supplied full-screen reference.
    // Wider/taller order monitor, still locked to the same 2048x1154 stage.
    const cart={x:704,y:78,w:640,h:184,button:88};
    scene.style.setProperty('--cart-left',`${g.x + cart.x*g.s}px`);
    scene.style.setProperty('--cart-top',`${g.y + cart.y*g.s}px`);
    scene.style.setProperty('--cart-width',`${cart.w*g.s}px`);
    scene.style.setProperty('--cart-height',`${cart.h*g.s}px`);
    scene.style.setProperty('--cart-button-width',`${cart.button*g.s}px`);

    // Exact centers of the second noren panels:
    // left panel: x≈145..329 -> center 237
    // right side is mirrored around the stage center.
    const logoSpec=[
      {x:243,y:168,w:213},
      {x:1817,y:168,w:213}
    ];
    document.querySelectorAll('.curtain-logo').forEach((logo,i)=>{
      const p=logoSpec[i];
      logo.style.setProperty('--logo-x',`${g.x + p.x*g.s}px`);
      logo.style.setProperty('--logo-y',`${g.y + p.y*g.s}px`);
      logo.style.setProperty('--logo-width',`${p.w*g.s}px`);
    });

    for(const s of states){
      s.el.style.left=`${g.x}px`;
      s.el.style.top=`${g.y+s.y*g.s}px`;
      s.el.style.width=`${g.w}px`;
      s.el.style.height=`${s.h*g.s}px`;

      const oldSpacing=s.spacing;
      s.tileW=g.w;
      // Slightly tighter than the previous build, still evenly spaced.
      s.spacing=(g.w/s.count)*1.46;
      s.speed=s.spacing/ITEM_PERIOD;
      s.items.forEach(it=>it.el.style.width=`${s.spacing}px`);

      if(!s.initialized){
        // Fill well beyond both sides of the viewport.
        const start=-4*s.spacing;
        s.items.forEach((it,i)=>it.x=start+i*s.spacing);
        s.initialized=true;
      }else if(oldSpacing>0){
        const ratio=s.spacing/oldSpacing;
        s.items.forEach(it=>it.x*=ratio);
      }
      render(s);
    }
  }

  function render(s){
    const phase=mod(s.offset,s.tileW);
    s.beltImgs.forEach((im,i)=>{
      im.style.width=`${s.tileW}px`;
      im.style.transform=`translate3d(${phase+(i-1)*s.tileW}px,0,0)`;
    });
    s.items.forEach(it=>{
      it.el.style.left=`${it.x}px`;
    });
  }

  // IMPORTANT:
  // The slot is recycled immediately after its whole slot is off-screen.
  // Its image source is changed only there, never while it can be seen.
  function recycleBack(item,now){
    delayedQueue.push({product:item.product,readyAt:now+FRONT_DELAY_MS});

    const minX=Math.min(...back.items.filter(o=>o!==item).map(o=>o.x));
    item.x=minX-back.spacing;
    setProduct(back,item,pickBack());
  }

  function recycleFront(item,now){
    const maxX=Math.max(...front.items.filter(o=>o!==item).map(o=>o.x));
    item.x=maxX+front.spacing;
    setProduct(front,item,nextFrontProduct(now));
  }

  function recycleIfNeeded(s,now){
    if(s===back){
      // Wait until the whole product artwork is safely beyond the right edge before recycling.
      const threshold=s.tileW+1.20*s.spacing;
      // Multiple crossings are handled deterministically from rightmost first.
      const crossed=s.items.filter(it=>it.x>threshold).sort((a,b)=>b.x-a.x);
      crossed.forEach(it=>recycleBack(it,now));
    }else{
      // The slot is completely left of the viewport when x + spacing < 0.
      const threshold=-1.30*s.spacing;
      const crossed=s.items.filter(it=>it.x<threshold).sort((a,b)=>a.x-b.x);
      crossed.forEach(it=>recycleFront(it,now));
    }
  }

  layout();

  let last=performance.now();
  function tick(t){
    const dt=Math.min((t-last)/1000,0.04);
    last=t;
    const now=Date.now();

    for(const s of states){
      const dx=s.speed*dt*s.dir;
      s.offset+=dx;
      s.items.forEach(it=>it.x+=dx);

      // Movement and content supply are separate.
      // Slots always circulate; only fully off-screen slots get new content.
      recycleIfNeeded(s,now);
      render(s);
    }
    requestAnimationFrame(tick);
  }

  addEventListener('resize',layout);
  requestAnimationFrame(tick);
})();

document.addEventListener('click', (event) => {
  const product = event.target.closest('.front .product');
  if (!product) return;
  const se = document.getElementById('cartAddSe');
  if (!se) return;
  se.currentTime = 0;
  se.volume = 0.75;
  se.play().catch(() => {});
});
