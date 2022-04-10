const cntctSlide = document.getElementById('cntct-slide');
const cntctLmtEl = document.getElementById('cntct-lmt-msg');
const pkgOvrVw = document.getElementById('pkg-ovrvw');
const addOnTbl = document.getElementById('addon-tbl');
const estPkg = document.getElementById('est-btn');
const mnthCostStrt = 69;
const mnthCostProf = 169;
const mnthCostBusi = 249;
const annCostStrt = 169;
const annCostProf = 289;
const annCostBusi = 349;
// script version 1.0.2

// convert basic number to account style number
function c(num) {
  // begins conversion process from value
  var n = num,
      d = n.toFixed(2),
      s = d.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

  // cnvrtd value options
  var nmbr = {
    n: n,
    d: d,
    s: s
  }
  return nmbr;
}

// click estimate notice
function estNotice(e) {
  const eNotice = document.getElementById('est-notice');
  if (e === 'est') {
    eNotice.style.color = 'var(--font-color)';
  } else {
    eNotice.style.color = 'red';
  }
}

// reset slider contact input on plan or payment changes
function rstSldr() {
  let addedCntcts = document.getElementById('add-cntct');
  let cntctCost = document.getElementById('cntct-cost');

  cntctSlide.value = '10000';
  addedCntcts.textContent = '10000';
  addedCntcts.attributes[1].value = 10000;
  cntctLmtEl.style.height = '0px';
  cntctCost.value = '0';
  cntctCost.textContent = '0';

}

// payment rate button behavior 
function pmtBttn(e) {
  const pmtRte = document.getElementById('pmt-rte');
  const pmtRteLngth = pmtRte.children.length;
  let bdy = e.parentElement;

  if (bdy.classList.contains('active')) {
    // console.log('yes');
  } else {
    // console.log('no');
    bdy.classList.remove('active');
    for (let i = 0; i < pmtRteLngth; i++) {
      let bdy = pmtRte.children[i];
      if (bdy.classList.contains('active')) {
        bdy.classList.remove('active');
      }
    }
    bdy.classList.add('active');

    // let rteSlctd = bdy.id;
    // priceAdjstr("",rteSlctd);
    priceAdjstr();
    rstSldr();
    estNotice();
  }
}
// set click function for payment rate behavior
(function pmtBttnAttr() {
  const pmtRte = document.getElementById('pmt-rte');
  const pmtRteArr = Array.from(pmtRte.children);

  let i = 0;
  pmtRteArr.forEach((e) => {
    i++;
    let optBdy = e.children[0];
    optBdy.setAttribute('onclick', 'pmtBttn(this)');
  });

})();

// adjust selectors, and values for package info
function priceAdjstr() {
  // const pkgOvrVw = document.getElementById('pkg-ovrvw');
  const plnName = document.getElementById('pln-name');
  const bllRte = document.getElementById('bll-rte');
  const plnCost = document.getElementById('pln-amnt');

  // for plan selected
  const plnWrppr = document.getElementById('plan-select');
  const plnCnt = plnWrppr.children.length;
  let plnType = plnWrppr.children;

  // for payment rate button
  const pmtWrppr = document.getElementById('pmt-rte');
  const pmtRteCnt = pmtWrppr.children.length;
  let pmtRte = pmtWrppr.children;

  // floating strings
  let pln = '';
  let rte = '';
  let pkgInfo = '';

  // find selected plan
  for (let i = 0; i < plnCnt; i++) {
    if (plnType[i].classList.contains('active')) {
      // console.log(plnType[i].id);
      
      pln = plnType[i].id;
    
    }
  }

  // find selected payment rate
  for (let i = 0; i < pmtRteCnt; i++) {
    if (pmtRte[i].classList.contains('active')) {
      // console.log(pmtRte[i].id);
      
      rte = pmtRte[i].id;
    
    }
  }

  // for debugging
  pkgInfo = `plan: ${pln} - pay rate: ${rte}`;
  console.log(pkgInfo);

  // Plan and Payment combinations
  let a = 'strt',
      b = 'prof',
      c = 'busi',
      e = 'pmt-mnth',
      f = 'pmt-ann',
      g = 'Monthly',
      h = 'Annually';

  // strt + monthly
  if (pln === a && rte === e) {
    plnName.setAttribute('value', a);
    plnName.textContent = 'Starter';
    plnCost.setAttribute('value', mnthCostStrt);
    plnCost.textContent = mnthCostStrt;
    bllRte.textContent = g;
  }
  // strt + annually
  if (pln === a && rte === f) {
    plnName.setAttribute('value', a);
    plnName.textContent = 'Starter';
    plnCost.setAttribute('value', annCostStrt);
    plnCost.textContent = annCostStrt;
    bllRte.textContent = h;
  }
  // prof + monthly
  if (pln === b && rte === e) {
    plnName.setAttribute('value', b);
    plnName.textContent = 'Professional';
    plnCost.setAttribute('value', mnthCostProf);
    plnCost.textContent = mnthCostProf;
    bllRte.textContent = g;
  }
  // prof + annually
  if (pln === b && rte === f) {
    plnName.setAttribute('value', b);
    plnName.textContent = 'Professional';
    plnCost.setAttribute('value', annCostProf);
    plnCost.textContent = annCostProf;
    bllRte.textContent = h;
  }
  // busi + monthly
  if (pln === c && rte === e) {
    plnName.setAttribute('value', c);
    plnName.textContent = 'Business';
    plnCost.setAttribute('value', mnthCostBusi);
    plnCost.textContent = mnthCostBusi;
    bllRte.textContent = g;
  }
  // busi + annually
  if (pln === c && rte === f) {
    plnName.setAttribute('value', c);
    plnName.textContent = 'Business';
    plnCost.setAttribute('value', annCostBusi);
    plnCost.textContent = annCostBusi;
    bllRte.textContent = h;
  }
}

// plan opts behavior
function planSlct(e) {
  const plnSlct = document.getElementById('plan-select');
  const plnSlctLngth = plnSlct.children.length;
  let bdy = e.parentElement;
  
  if (bdy.classList.contains('active')) {
    // console.log('yes');
  } else {
    // console.log('no');
    bdy.classList.remove('active');
    for (let i = 0; i < plnSlctLngth; i++) {      
      let bdy = plnSlct.children[i];
      if (bdy.classList.contains('active')) {
        bdy.classList.remove('active');
      }
    }
    bdy.classList.add('active');

    priceAdjstr();
    rstSldr();
    estNotice();
  }
}
// set click function for plan opts 
(function planAttr(){
  const plnSlct = document.getElementById('plan-select');
  const plnSlctArr = Array.from(plnSlct.children);

  let i = 0;
  plnSlctArr.forEach((e) => {
    i++;
    let optBdy = e.children[0];
    optBdy.setAttribute('onclick', 'planSlct(this)');
  });

})();

// reset relative qty number when unchecking addon
function rstChkBx(e) {
  let chkd = e.target.checked;
  let nmbrBx = e.target.parentElement.parentElement.children[1].children[1];

  if (!chkd) {
    if (nmbrBx === undefined) {

    } else {
      nmbrBx.value = 0;
    }
  }
}
// place event listeners to all addon checkboxe
(function(){
  let chkBx = document.querySelectorAll('input[type="checkbox"]');

  chkBx.forEach((e) => {
    e.addEventListener('change', rstChkBx);
  });

})();

// add table row to package overveiw when addon checked
function addToPkg(e) {
  let addOnVal = e.target.value;
  let addOnLbl = this.parentElement.children[1].textContent;
  let addOnQty = this.parentElement.parentElement.children[1].children[1];
  let addOnTblLst = addOnTbl.children[0];
  let addOnId = this.parentElement.parentElement.parentElement.attributes[1].value;

  if (e.target.checked) {
    // console.log(addOnQty.value);
    if (addOnQty === undefined) { // if addon does not have a number input
      // writes table row
      addOnTblLst.innerHTML += `<tr id="itm-${addOnId}">
                                  <td>
                                    <strong>${addOnLbl}</strong>
                                  </td>
                                  <td>qty:<span>1</span></td>
                                  <td>$<span name="itm-ttl" value="${addOnVal}"> ${addOnVal}</span></td>
                                </tr>`;
    } else {// if addon has a number input
      // set qty number when addon checked
      addOnQty.value = 1;

      // number for quantity count in overview
      let addQty = addOnQty.value = 1;

      // writes table row
      addOnTblLst.innerHTML += `<tr id="itm-${addOnId}">
                                  <td>
                                    <strong>${addOnLbl}</strong>
                                  </td>
                                  <td>qty:<span>${addQty}</span></td>
                                  <td>$<span name="itm-ttl" value="${addOnVal}"> ${addOnVal}</span></td>
                                </tr>`;
            
      // apply event listener to number input when box is checked 
      addOnQty.addEventListener('click', function(){
        let addOnQty = this.value;
        let itmId = document.getElementById(`itm-${addOnId}`);
        
        // update addon quantity with each click of number input
        itmId.children[1].children[0].textContent = addOnQty;
  
        // adjust quantity number in the overview table row  
        let itmCst = parseInt(addOnVal) * parseInt(addOnQty);

        let a = c(itmCst);

        // set new cost into the value and text
        itmId.children[2].children[0].setAttribute('value',`${a.n}`);
        itmId.children[2].children[0].textContent = `${a.s}`;
      });

    }
  
    estNotice();

  } else {// check box unchecked

    if (addOnQty === undefined) {
      
      // get Id of addon box being unchecked and remove from overview list
      let a = document.getElementById(`itm-${addOnId}`);
      a.remove();
      
    } else {
      // reset quantity when check box unchecked
      addOnQty.value = 0;
      
      // get Id of addon box being unchecked and remove from overview list
      let a = document.getElementById(`itm-${addOnId}`);
      a.remove();
    }

    estNotice();

  }

}
// add event listeners to addon check boxes
(function(){
  const chkBxInpt = document.getElementsByName('addon-itm');
  let chkBxInptArr = Array.from(chkBxInpt);

  chkBxInptArr.forEach((e) => {
    e.addEventListener('change', addToPkg);
  });
  
})();

// toggle addon description box
function tggleDesc(e) {
  const addonWrp = document.getElementById('addons-wrppr');
  const addonLst = document.getElementById('addon-lst');
  // gets parent row of icon
  let rw = e.parentElement.parentElement.parentElement.parentElement;
  // get main parent class
  let desc = e.parentElement.parentElement.parentElement.children[1];
  // get p tag
  let descP = desc.children[0];
  // get the height of p tag
  let descH = descP.clientHeight;
  // convert elements to array
  let addonLstArr = Array.from(addonLst.children[0].children);

  // add tggle class on / off
  // apply height of p tag and open this description box
  if (rw.classList.contains('on')) {
    desc.style.height = '0px';
    rw.classList.replace('on', 'off');
  } else {
    // finds rows with class of on
    for (let i = 0; i < addonLstArr.length; i++) {
      let rw = addonLstArr[i];

      let rwDesc = rw.children[0].children[1];

      if (rw.classList.contains('on')) {

        rwDesc.style.height = '0px';
        rw.classList.replace('on', 'off');
      }
    }

    desc.style.height = `${descH}px`;
    rw.classList.replace('off', 'on');
  }
}
// set attributes for addons
(function addonAttr(){
  const addonWrp = document.getElementById('addons-wrppr');
  const addonArr = Array.from(addonWrp.children[1].children[0].children);

  i = 0;
  addonArr.forEach((e) => {
    // add id to parent row    
    i++;
    e.children[0].setAttribute('id', i);
    // add eventListener to icon
    let icn = e.children[0].children[0].children[1].children[2];
    // find icons in addons with and without quantity object
    if (icn === undefined) {
      icn = e.children[0].children[0].children[1].children[0];
      icn.setAttribute('onclick','tggleDesc(this)');
      e.classList.add('off');
    } else {
      icn.setAttribute('onclick','tggleDesc(this)');
      e.classList.add('off');
    }
  });
})();

// open or close addon list
function tgglList() {
  console.log('here');

  const addonLst = document.getElementById('addon-lst');

  if (addonLst.classList.contains('off')) {
    console.log('opened');
    addonLst.style.height = '750px';
    addonLst.classList.replace('off', 'on');
  } else {
    console.log('closed');
    addonLst.style.height = '0px';
    addonLst.classList.replace('on','off');
  }
  
}
// set attr on icon button for addon list
(function addonLst(){
  const addonBtn = document.getElementById('addon-lst-bttn');
  addonBtn.children[0].setAttribute('onclick', 'tgglList(this)');
})();

// contact slider
function slideChange(e){
  let sldVal = e.target.value;
  let incrmnt = (sldVal/1000) - 9;
  let prcPerInc = incrmnt * 45 - 45;
  
  let addedCntcts = document.getElementById('add-cntct');
  addedCntcts.attributes[1].value = sldVal;
  addedCntcts.textContent = sldVal;
  
  let cntctCost = document.getElementById('cntct-cost');
  

  // take out contact fee incrment when range slide at 10k/1
  if (incrmnt === 1) {
    let a = 0;
    cntctCost.setAttribute('value', a);
    cntctCost.textContent = a;
  } else {
    let a = prcPerInc;
    let b = c(a);

    cntctCost.setAttribute('value', b.n);
    cntctCost.textContent = b.s;

  }

  // update message and change select plan when in different slider range
  if (sldVal >= 500000) {
    
    cntctLmtEl.style.height = 'auto';

    cntctLmtEl.innerHTML = '<p><strong>Have more than 500,000 contacts?</strong><br>Please call to discuss your pricing options if your database exceeds 500,000 contacts.</p>';
    
    plnType = 'busi';
  } else {
    cntctLmtEl.style.height = '0px';
  }

  estNotice();

};

// calculate and show package estimation
function estPkgTotal() {
  const finalEst = document.getElementById('est-ttl');
  let plnAmnt = document.getElementById('pln-amnt').attributes[1].value;
  let cntctCst = document.getElementById('cntct-cost').attributes[1].value;
  const addOnTbl = document.getElementById('addon-tbl');
  let addOnTr = addOnTbl.children[0];
  const addOnTrCnt = addOnTbl.children[0].children.length;
  let addOnTotal = 0;

  // checks if addon table is empty or not  
  if (addOnTrCnt === 0) {
    // console.log('no trs');
    let estTotal = parseInt(plnAmnt) + parseInt(cntctCst);
    let a = c(estTotal);
    finalEst.textContent = a.s;
  } else {
    // console.log('yes trs');
    for (let i = 0; i < addOnTrCnt; i++) {
      let addOnCst = addOnTr.children[i].children[2].children[0].attributes[1].value;
      addOnTotal += parseInt(addOnCst);
    }
    let estTotal = parseInt(addOnTotal) + parseInt(plnAmnt) + parseInt(cntctCst);
    let a = c(estTotal);
    finalEst.textContent = a.s;
  }
  estNotice('est');
}

estPkg.addEventListener('click', estPkgTotal);
cntctSlide.addEventListener('input', slideChange);
