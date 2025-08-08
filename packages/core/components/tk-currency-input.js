import { p as proxyCustomElement, H, c as createEvent, h } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift } from './p-B0XocndT.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$2 } from './p-vR69rcDp.js';
import { v as v4 } from './p-BF0_OXTe.js';

const INTERNAL_CURRENCY_LIST = [
  { code: 'USD', id: 'US', symbol: '$', name: 'US Dollar', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'EUR', id: 'DE', symbol: '€', name: 'Euro', decimalSeparator: ',', thousandsSeparator: '.' },
  { code: 'GBP', id: 'GB', symbol: '£', name: 'British Pound', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'TRY', id: 'TR', symbol: '₺', name: 'Turkish Lira', decimalSeparator: ',', thousandsSeparator: '.' },
  { code: 'JPY', id: 'JP', symbol: '¥', name: 'Japanese Yen', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'CAD', id: 'CA', symbol: 'C$', name: 'Canadian Dollar', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'AUD', id: 'AU', symbol: 'A$', name: 'Australian Dollar', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'CHF', id: 'CH', symbol: 'Fr', name: 'Swiss Franc', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'CNY', id: 'CN', symbol: '¥', name: 'Chinese Yuan', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'SEK', id: 'SE', symbol: 'kr', name: 'Swedish Krona', decimalSeparator: ',', thousandsSeparator: ' ' },
];

const tkCurrencyInputCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-currency-input{display:flex;flex-direction:column;gap:var(--input-external-label-large-container-gap);box-sizing:border-box}.tk-currency-input[aria-invalid] .tk-currency-input__wrapper{border-color:var(--states-danger-base)}.tk-currency-input[aria-invalid] .tk-currency-input__hint-text{color:var(--states-danger-base)}.tk-currency-input[aria-invalid] .tk-currency-input__hint i{color:var(--states-danger-base)}.tk-currency-input[aria-disabled] .tk-currency-input__wrapper{background-color:var(--background-lightest);border-color:var(--border-light)}.tk-currency-input[aria-disabled] .tk-currency-input__label,.tk-currency-input[aria-disabled] .tk-currency-input__hint-text{color:var(--text-sub-base);pointer-events:none}.tk-currency-input[aria-disabled] .tk-currency-input__input,.tk-currency-input[aria-disabled] .tk-currency-input__dropdown-button{color:var(--text-sub-base);pointer-events:none}.tk-currency-input[aria-disabled] .tk-currency-input__input::placeholder,.tk-currency-input[aria-disabled] .tk-currency-input__dropdown-button::placeholder{color:var(--text-sub-base)}.tk-currency-input[aria-readonly] .tk-currency-input__wrapper{background-color:var(--background-lightest);border-color:var(--border-light)}.tk-currency-input[aria-readonly] .tk-currency-input__label,.tk-currency-input[aria-readonly] .tk-currency-input__hint-text{color:var(--text-sub-base)}.tk-currency-input[aria-readonly] .tk-currency-input__input,.tk-currency-input[aria-readonly] .tk-currency-input__dropdown-button{color:var(--text-darkest);pointer-events:none}.tk-currency-input[aria-readonly] .tk-currency-input__input::placeholder,.tk-currency-input[aria-readonly] .tk-currency-input__dropdown-button::placeholder{color:var(--text-darkest)}.tk-currency-input--large .tk-currency-input__wrapper{height:var(--spacing-12xl);padding:var(--input-external-label-large-label-v-padding) var(--input-external-label-large-label-h-padding)}.tk-currency-input--large .tk-currency-input__label{font-size:var(--desktop-label-l-size);line-height:var(--desktop-label-l-line-height);padding:var(--input-external-label-large-label-v-padding) var(--input-external-label-large-label-h-padding)}.tk-currency-input--large .tk-currency-input__label-title{font-size:var(--desktop-label-l-size);line-height:var(--desktop-label-l-line-height)}.tk-currency-input--large .tk-currency-input__dropdown-menu{top:var(--spacing-12xl)}.tk-currency-input--large .tk-currency-input__dropdown-menu-list-item{font-size:var(--desktop-label-l-size);line-height:var(--desktop-label-l-line-height)}.tk-currency-input--base .tk-currency-input__wrapper{height:var(--spacing-10xl);padding:var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding)}.tk-currency-input--base .tk-currency-input__label{font-size:var(--desktop-label-m-base-size);line-height:var(--desktop-label-m-base-line-height);padding:var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding)}.tk-currency-input--base .tk-currency-input__label-title{font-size:var(--desktop-label-m-base-size);line-height:var(--desktop-label-m-base-line-height)}.tk-currency-input--base .tk-currency-input__dropdown-menu{top:var(--spacing-10xl)}.tk-currency-input--base .tk-currency-input__dropdown-menu-list-item{font-size:var(--desktop-label-m-base-size);line-height:var(--desktop-label-m-base-line-height)}.tk-currency-input--small .tk-currency-input__wrapper{height:var(--spacing-8xl);padding:var(--input-external-label-small-label-v-padding) var(--input-external-label-small-label-h-padding)}.tk-currency-input--small .tk-currency-input__label{font-size:var(--desktop-label-s-size);line-height:var(--desktop-label-s-line-height);padding:var(--input-external-label-small-label-v-padding) var(--input-external-label-small-label-h-padding)}.tk-currency-input--small .tk-currency-input__label-title{font-size:var(--desktop-label-s-size);line-height:var(--desktop-label-s-line-height)}.tk-currency-input--small .tk-currency-input__dropdown-menu{top:var(--spacing-8xl)}.tk-currency-input--small .tk-currency-input__dropdown-menu-list-item{font-size:var(--desktop-label-s-size);line-height:var(--desktop-label-s-line-height)}.tk-currency-input__label{display:flex;align-items:flex-start;box-sizing:border-box}.tk-currency-input__label-title{color:var(--text-darkest);font-family:var(--desktop-label-s-font, "Georgia");font-weight:var(--weight-medium)}.tk-currency-input__label-red-asterisk{color:var(--states-danger-base);font-size:var(--desktop-label-m-base-size);font-weight:var(--weight-regular);line-height:var(--desktop-label-s-line-height)}.tk-currency-input__wrapper{box-sizing:border-box;position:relative;display:flex;width:-webkit-fill-available;color:var(--text-darkest);font-family:var(--desktop-label-s-font, "Georgia");border-radius:var(--button-sizes-large-radius);border:var(--spacing-px) solid var(--border-light);background:var(--static-light)}.tk-currency-input__wrapper--focus{border:var(--spacing-px) solid var(--states-info-base)}.tk-currency-input__wrapper:hover{background-color:var(--background-lightest)}.tk-currency-input__dropdown{box-sizing:border-box}.tk-currency-input__dropdown-button{cursor:pointer;display:flex;align-items:center;width:max-content;height:100%;border:none;font-family:var(--desktop-label-s-font, "Georgia");font-size:var(--desktop-label-l-size);font-weight:var(--weight-medium);color:var(--text-darkest);background-color:transparent;padding-right:var(--input-external-label-large-label-h-padding)}.tk-currency-input__dropdown-button-selected{display:flex;align-items:center;gap:var(--spacing-xs);border-left:var(--spacing-px) solid var(--border-light)}.tk-currency-input__dropdown-button-selected .flag{margin-left:var(--input-external-label-large-label-h-padding)}.tk-currency-input__dropdown-menu{position:absolute;right:var(--spacing-none);z-index:10;background:var(--static-light);border:var(--spacing-px) solid var(--border-light);border-radius:var(--button-sizes-large-radius);box-shadow:var(--effect-1-default-sm);width:var(--spacing-80xl);display:flex;flex-direction:column}.tk-currency-input__dropdown-menu-search{padding:var(--spacing-m-base)}.tk-currency-input__dropdown-menu-list{list-style:none;padding:var(--spacing-none);margin:var(--spacing-none) var(--spacing-m-base) var(--spacing-none) var(--spacing-none);max-height:var(--spacing-56xl);overflow-y:auto;}.tk-currency-input__dropdown-menu-list-item{display:flex;align-items:center;gap:var(--spacing-xs);padding:var(--input-external-label-base-input-v-padding) var(--spacing-4xl);cursor:pointer;transition:background-color 0.2s;font-family:var(--desktop-label-s-font, "Georgia")}.tk-currency-input__dropdown-menu-list-item:hover{background-color:var(--background-lightest)}.tk-currency-input__dropdown-menu-list-item-country-label{flex-grow:1;white-space:nowrap;color:var(--text-darkest);font-size:var(--size-sm)}.tk-currency-input__dropdown-menu-list-item-dial-id{color:var(--text-darkest);font-size:var(--desktop-label-m-base-size)}.tk-currency-input__dropdown-menu-list::-webkit-scrollbar{width:var(--spacing-l)}.tk-currency-input__dropdown-menu-list::-webkit-scrollbar-track{background:var(--background-lightest);border-radius:var(--radius-m-base)}.tk-currency-input__dropdown-menu-list::-webkit-scrollbar-thumb{background:var(--secondary-300);border-radius:var(--radius-m-base)}.tk-currency-input__dropdown-menu-list::-webkit-scrollbar-thumb:hover{background:var(--secondary-400)}.tk-currency-input__input{border:none;font-family:var(--desktop-label-s-font, "Georgia");font-size:var(--desktop-label-l-size);font-weight:var(--weight-medium);background-color:transparent;outline:none;color:var(--text-darkest);width:inherit}.tk-currency-input__input::placeholder{color:var(--text-sub-base)}.tk-currency-input__hint{color:var(--text-base);line-height:var(--desktop-label-s-line-height);font-size:var(--desktop-label-s-size);font-weight:300;display:flex;align-items:center;gap:var(--spacing-m-base)}.tk-currency-input__hint-icon{font-size:var(--size-base);width:var(--size-base);height:var(--size-base);color:var(--icon-base)}';

const flagCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}span.flag{width:44px;height:30px;display:inline-block}img.flag{width:20px;height:20px;border-radius:100%;background-position-x:45%}.flag{background:url(https://primefaces.org/cdn/primevue/images/flag/flags_responsive.png) no-repeat;background-size:150%;vertical-align:middle}.flag-ad{background-position-y:0.413223%}.flag-ae{background-position-y:0.826446%}.flag-af{background-position-y:1.239669%}.flag-ag{background-position-y:1.652893%}.flag-ai{background-position-y:2.066116%}.flag-al{background-position-y:2.479339%}.flag-am{background-position-y:2.892562%}.flag-an{background-position-y:3.305785%}.flag-ao{background-position-y:3.719008%}.flag-aq{background-position-y:4.132231%}.flag-ar{background-position-y:4.545455%}.flag-as{background-position-y:4.958678%}.flag-at{background-position-y:5.371901%}.flag-au{background-position-y:5.785124%}.flag-aw{background-position-y:6.198347%}.flag-az{background-position-y:6.61157%}.flag-ba{background-position-y:7.024793%}.flag-bb{background-position-y:7.438017%}.flag-bd{background-position-y:7.85124%}.flag-be{background-position-y:8.264463%}.flag-bf{background-position-y:8.677686%}.flag-bg{background-position-y:9.090909%}.flag-bh{background-position-y:9.504132%}.flag-bi{background-position-y:9.917355%}.flag-bj{background-position-y:10.330579%}.flag-bm{background-position-y:10.743802%}.flag-bn{background-position-y:11.157025%}.flag-bo{background-position-y:11.570248%}.flag-br{background-position-y:11.983471%}.flag-bs{background-position-y:12.396694%}.flag-bt{background-position-y:12.809917%}.flag-bv{background-position-y:13.22314%}.flag-bw{background-position-y:13.636364%}.flag-by{background-position-y:14.049587%}.flag-bz{background-position-y:14.46281%}.flag-ca{background-position-y:14.876033%}.flag-cc{background-position-y:15.289256%}.flag-cd{background-position-y:15.702479%}.flag-cf{background-position-y:16.115702%}.flag-cg{background-position-y:16.528926%}.flag-ch{background-position-y:16.942149%}.flag-ci{background-position-y:17.355372%}.flag-ck{background-position-y:17.768595%}.flag-cl{background-position-y:18.181818%}.flag-cm{background-position-y:18.595041%}.flag-cn{background-position-y:19.008264%}.flag-co{background-position-y:19.421488%}.flag-cr{background-position-y:19.834711%}.flag-cu{background-position-y:20.247934%}.flag-cv{background-position-y:20.661157%}.flag-cx{background-position-y:21.07438%}.flag-cy{background-position-y:21.487603%}.flag-cz{background-position-y:21.900826%}.flag-de{background-position-y:22.31405%}.flag-dj{background-position-y:22.727273%}.flag-dk{background-position-y:23.140496%}.flag-dm{background-position-y:23.553719%}.flag-do{background-position-y:23.966942%}.flag-dz{background-position-y:24.380165%}.flag-ec{background-position-y:24.793388%}.flag-ee{background-position-y:25.206612%}.flag-eg{background-position-y:25.619835%}.flag-eh{background-position-y:26.033058%}.flag-er{background-position-y:26.446281%}.flag-es{background-position-y:26.859504%}.flag-et{background-position-y:27.272727%}.flag-fi{background-position-y:27.68595%}.flag-fj{background-position-y:28.099174%}.flag-fk{background-position-y:28.512397%}.flag-fm{background-position-y:28.92562%}.flag-fo{background-position-y:29.338843%}.flag-fr{background-position-y:29.752066%}.flag-ga{background-position-y:30.165289%}.flag-gd{background-position-y:30.578512%}.flag-ge{background-position-y:30.991736%}.flag-gf{background-position-y:31.404959%}.flag-gh{background-position-y:31.818182%}.flag-gi{background-position-y:32.231405%}.flag-gl{background-position-y:32.644628%}.flag-gm{background-position-y:33.057851%}.flag-gn{background-position-y:33.471074%}.flag-gp{background-position-y:33.884298%}.flag-gq{background-position-y:34.297521%}.flag-gr{background-position-y:34.710744%}.flag-gs{background-position-y:35.123967%}.flag-gt{background-position-y:35.53719%}.flag-gu{background-position-y:35.950413%}.flag-gw{background-position-y:36.363636%}.flag-gy{background-position-y:36.77686%}.flag-hk{background-position-y:37.190083%}.flag-hm{background-position-y:37.603306%}.flag-hn{background-position-y:38.016529%}.flag-hr{background-position-y:38.429752%}.flag-ht{background-position-y:38.842975%}.flag-hu{background-position-y:39.256198%}.flag-id{background-position-y:39.669421%}.flag-ie{background-position-y:40.082645%}.flag-il{background-position-y:40.495868%}.flag-in{background-position-y:40.909091%}.flag-io{background-position-y:41.322314%}.flag-iq{background-position-y:41.735537%}.flag-ir{background-position-y:42.14876%}.flag-is{background-position-y:42.561983%}.flag-it{background-position-y:42.975207%}.flag-jm{background-position-y:43.38843%}.flag-jo{background-position-y:43.801653%}.flag-jp{background-position-y:44.214876%}.flag-ke{background-position-y:44.628099%}.flag-kg{background-position-y:45.041322%}.flag-kh{background-position-y:45.454545%}.flag-ki{background-position-y:45.867769%}.flag-km{background-position-y:46.280992%}.flag-kn{background-position-y:46.694215%}.flag-kp{background-position-y:47.107438%}.flag-kr{background-position-y:47.520661%}.flag-kw{background-position-y:47.933884%}.flag-ky{background-position-y:48.347107%}.flag-kz{background-position-y:48.760331%}.flag-la{background-position-y:49.173554%}.flag-lb{background-position-y:49.586777%}.flag-lc{background-position-y:50%}.flag-li{background-position-y:50.413223%}.flag-lk{background-position-y:50.826446%}.flag-lr{background-position-y:51.239669%}.flag-ls{background-position-y:51.652893%}.flag-lt{background-position-y:52.066116%}.flag-lu{background-position-y:52.479339%}.flag-lv{background-position-y:52.892562%}.flag-ly{background-position-y:53.305785%}.flag-ma{background-position-y:53.719008%}.flag-mc{background-position-y:54.132231%}.flag-md{background-position-y:54.545455%}.flag-me{background-position-y:54.958678%}.flag-mg{background-position-y:55.371901%}.flag-mh{background-position-y:55.785124%}.flag-mk{background-position-y:56.198347%}.flag-ml{background-position-y:56.61157%}.flag-mm{background-position-y:57.024793%}.flag-mn{background-position-y:57.438017%}.flag-mo{background-position-y:57.85124%}.flag-mp{background-position-y:58.264463%}.flag-mq{background-position-y:58.677686%}.flag-mr{background-position-y:59.090909%}.flag-ms{background-position-y:59.504132%}.flag-mt{background-position-y:59.917355%}.flag-mu{background-position-y:60.330579%}.flag-mv{background-position-y:60.743802%}.flag-mw{background-position-y:61.157025%}.flag-mx{background-position-y:61.570248%}.flag-my{background-position-y:61.983471%}.flag-mz{background-position-y:62.396694%}.flag-na{background-position-y:62.809917%}.flag-nc{background-position-y:63.22314%}.flag-ne{background-position-y:63.636364%}.flag-nf{background-position-y:64.049587%}.flag-ng{background-position-y:64.46281%}.flag-ni{background-position-y:64.876033%}.flag-nl{background-position-y:65.289256%}.flag-no{background-position-y:65.702479%}.flag-np{background-position-y:66.115702%}.flag-nr{background-position-y:66.528926%}.flag-nu{background-position-y:66.942149%}.flag-nz{background-position-y:67.355372%}.flag-om{background-position-y:67.768595%}.flag-pa{background-position-y:68.181818%}.flag-pe{background-position-y:68.595041%}.flag-pf{background-position-y:69.008264%}.flag-pg{background-position-y:69.421488%}.flag-ph{background-position-y:69.834711%}.flag-pk{background-position-y:70.247934%}.flag-pl{background-position-y:70.661157%}.flag-pm{background-position-y:71.07438%}.flag-pn{background-position-y:71.487603%}.flag-pr{background-position-y:71.900826%}.flag-pt{background-position-y:72.31405%}.flag-pw{background-position-y:72.727273%}.flag-py{background-position-y:73.140496%}.flag-qa{background-position-y:73.553719%}.flag-re{background-position-y:73.966942%}.flag-ro{background-position-y:74.380165%}.flag-rs{background-position-y:74.793388%}.flag-ru{background-position-y:75.206612%}.flag-rw{background-position-y:75.619835%}.flag-sa{background-position-y:76.033058%}.flag-sb{background-position-y:76.446281%}.flag-sc{background-position-y:76.859504%}.flag-sd{background-position-y:77.272727%}.flag-se{background-position-y:77.68595%}.flag-sg{background-position-y:78.099174%}.flag-sh{background-position-y:78.512397%}.flag-si{background-position-y:78.92562%}.flag-sj{background-position-y:79.338843%}.flag-sk{background-position-y:79.752066%}.flag-sl{background-position-y:80.165289%}.flag-sm{background-position-y:80.578512%}.flag-sn{background-position-y:80.991736%}.flag-so{background-position-y:81.404959%}.flag-sr{background-position-y:81.818182%}.flag-ss{background-position-y:82.231405%}.flag-st{background-position-y:82.644628%}.flag-sv{background-position-y:83.057851%}.flag-sy{background-position-y:83.471074%}.flag-sz{background-position-y:83.884298%}.flag-tc{background-position-y:84.297521%}.flag-td{background-position-y:84.710744%}.flag-tf{background-position-y:85.123967%}.flag-tg{background-position-y:85.53719%}.flag-th{background-position-y:85.950413%}.flag-tj{background-position-y:86.363636%}.flag-tk{background-position-y:86.77686%}.flag-tl{background-position-y:87.190083%}.flag-tm{background-position-y:87.603306%}.flag-tn{background-position-y:88.016529%}.flag-to{background-position-y:88.429752%}.flag-tp{background-position-y:88.842975%}.flag-tr{background-position-y:89.256198%}.flag-tt{background-position-y:89.669421%}.flag-tv{background-position-y:90.082645%}.flag-tw{background-position-y:90.495868%}.flag-ty{background-position-y:90.909091%}.flag-tz{background-position-y:91.322314%}.flag-ua{background-position-y:91.735537%}.flag-ug{background-position-y:92.14876%}.flag-gb,.flag-uk{background-position-y:92.561983%}.flag-um{background-position-y:92.975207%}.flag-us{background-position-y:93.38843%}.flag-uy{background-position-y:93.801653%}.flag-uz{background-position-y:94.214876%}.flag-va{background-position-y:94.628099%}.flag-vc{background-position-y:95.041322%}.flag-ve{background-position-y:95.454545%}.flag-vg{background-position-y:95.867769%}.flag-vi{background-position-y:96.280992%}.flag-vn{background-position-y:96.694215%}.flag-vu{background-position-y:97.107438%}.flag-wf{background-position-y:97.520661%}.flag-ws{background-position-y:97.933884%}.flag-ye{background-position-y:98.347107%}.flag-za{background-position-y:98.760331%}.flag-zm{background-position-y:99.173554%}.flag-zr{background-position-y:99.586777%}.flag-zw{background-position-y:100%}';

const TkCurrencyInput$1 = /*@__PURE__*/ proxyCustomElement(
  class TkCurrencyInput extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 5);
      this.tkBlur = createEvent(this, 'tkBlur', 7);
      this.tkFocus = createEvent(this, 'tkFocus', 7);
      this.uniqueId = v4();
      /**
       * The value displayed in the input field, formatted as a currency string.
       * This is updated based on the current numeric value and selected currency.
       */
      this.displayValue = '';
      /**
       * Indicates whether the dropdown for currency selection is open.
       */
      this.isDropdownOpen = false;
      /**
       * Current numeric value of the input, used for calculations and formatting.
       * This is updated based on user input and can be used in form submissions.
       */
      this.currentNumericValue = 0;
      /**
       * The value of the input.
       */
      this.value = 0;
      /**
       * Disables the input field if set to true.
       */
      this.disabled = false;
      /**
       * Marks the input field as invalid if set to true.
       */
      this.invalid = false;
      /**
       * Makes the input field read-only if set to true.
       */
      this.readonly = false;
      /**
       * Sets size for the component.
       */
      this.size = 'base';
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * The number of decimal places to display in the formatted currency value.
       * Default is 2, which is common for most currencies.
       */
      this.precision = 2;
      /**
       * The default currency to use when the component is initialized.
       * Default is 'TRY'.
       */
      this.defaultCurrency = 'TRY';
      /**
       * Allows negative values to be entered if set to true.
       */
      this.allowNegative = false;
      this.closeDropdown = event => {
        var _a;
        if (!this.isDropdownOpen) {
          return;
        }
        const target = event.target;
        if (this.dropdownEl && this.dropdownEl.contains(target)) {
          return;
        }
        const hostElement = (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.closest('tk-currency-input');
        if (hostElement && hostElement.contains(target)) {
          return;
        }
        this.isDropdownOpen = false;
      };
      this.toggleDropdown = event => {
        event.stopPropagation();
        event.preventDefault();
        if (!this.disabled && !this.readonly) {
          this.isDropdownOpen = !this.isDropdownOpen;
        }
      };
      this.handleInput = event => {
        const target = event.target;
        const inputValue = target.value;
        const cursorPosition = target.selectionStart;
        // Use custom separators if provided, otherwise fall back to currency defaults
        const decimalSeparator = this.getDecimalSeparator();
        const thousandsSeparator = this.getThousandsSeparator();
        // Allow negative sign if allowNegative is true
        const negativePattern = this.allowNegative ? '\\-' : '';
        const allowedChars = new RegExp(`[0-9\\${decimalSeparator}\\${thousandsSeparator}${negativePattern}]`);
        let filteredValue = '';
        let removedCharsBeforeCursor = 0;
        let hasNegativeSign = false;
        for (let i = 0; i < inputValue.length; i++) {
          const char = inputValue[i];
          // Handle negative sign - only allow it at the beginning
          if (char === '-' && this.allowNegative && i === 0 && !hasNegativeSign) {
            filteredValue += char;
            hasNegativeSign = true;
          } else if (char === '-' && this.allowNegative && hasNegativeSign) {
            // Remove duplicate negative signs
            if (i < cursorPosition) {
              removedCharsBeforeCursor++;
            }
          } else if (allowedChars.test(char) && char !== '-') {
            filteredValue += char;
          } else if (i < cursorPosition) {
            removedCharsBeforeCursor++;
          }
        }
        const numericValue = this.parseFormattedValue(filteredValue);
        this.currentNumericValue = numericValue;
        const formattedValue = this.formatCurrency(numericValue);
        this.displayValue = formattedValue;
        target.value = formattedValue;
        const newCursorPosition = this.calculateNewCursorPosition(inputValue, formattedValue, cursorPosition, removedCharsBeforeCursor);
        requestAnimationFrame(() => {
          target.setSelectionRange(newCursorPosition, newCursorPosition);
        });
        const eventData = {
          value: numericValue,
          currency: this.selectedCurrency,
          formattedValue: formattedValue,
        };
        this.tkChange.emit(eventData);
      };
      this.handleFocus = () => {
        this.tkFocus.emit();
      };
      this.handleBlur = () => {
        const target = this.inputElement;
        const numericValue = this.parseFormattedValue(target.value);
        this.currentNumericValue = numericValue;
        const formattedValue = this.formatCurrency(numericValue);
        target.value = formattedValue;
        this.displayValue = formattedValue;
        this.tkBlur.emit();
      };
      this.handleSelectCurrency = (currencyCode, event) => {
        event.stopPropagation();
        event.preventDefault();
        const currencies = this.getCurrencies();
        const currency = currencies.find(c => c.code.toUpperCase() === currencyCode.toUpperCase());
        if (currency) {
          this.selectedCurrency = currency;
          this.updateDisplayValue();
          this.isDropdownOpen = false;
          if (this.inputElement) {
            this.inputElement.value = this.displayValue;
          }
          const eventData = {
            value: this.currentNumericValue,
            currency: this.selectedCurrency,
            formattedValue: this.displayValue,
          };
          this.tkChange.emit(eventData);
        }
      };
    }
    valueChanged() {
      if (this.value !== this.currentNumericValue) {
        this.currentNumericValue = this.value || 0;
        this.updateDisplayValue();
      }
    }
    defaultCurrencyChanged() {
      const currencies = this.getCurrencies();
      const currency = currencies.find(c => c.code.toUpperCase() === this.defaultCurrency.toUpperCase());
      if (currency) {
        this.selectedCurrency = currency;
        this.updateDisplayValue();
        if (this.inputElement) {
          this.inputElement.value = this.displayValue;
        }
        const eventData = {
          value: this.currentNumericValue,
          currency: this.selectedCurrency,
          formattedValue: this.displayValue,
        };
        this.tkChange.emit(eventData);
      }
    }
    /**
     * Initialize the component before it is rendered.
     */
    componentWillLoad() {
      this.setSelectedCurrency(this.defaultCurrency);
    }
    /**
     * Update the component when properties change.
     */
    componentDidUpdate() {
      var _a;
      if (this.isDropdownOpen) {
        this.cleanup = autoUpdate(this.el.querySelector('.tk-currency-input__wrapper'), this.el, () => this.updatePosition(), {
          animationFrame: true,
        });
      } else {
        (_a = this.dropdownEl) === null || _a === void 0 ? void 0 : _a.remove();
        this.cleanup && this.cleanup();
      }
    }
    connectedCallback() {
      document.addEventListener('click', this.closeDropdown);
    }
    disconnectedCallback() {
      document.removeEventListener('click', this.closeDropdown);
    }
    /**
     * Get the currencies list - either from prop or use internal default
     */
    getCurrencies() {
      return this.currencyList || INTERNAL_CURRENCY_LIST;
    }
    setSelectedCurrency(currencyCode) {
      const currencies = this.getCurrencies();
      const currency = currencies.find(c => c.code.toUpperCase() === currencyCode.toUpperCase());
      this.selectedCurrency = currency || currencies[0];
      this.currentNumericValue = this.value || 0;
      this.updateDisplayValue();
    }
    updatePosition() {
      const tkCurrenInputRootEl = this.el.querySelector('.tk-currency-input__wrapper');
      if (tkCurrenInputRootEl && this.dropdownEl) {
        computePosition(tkCurrenInputRootEl, this.dropdownEl, {
          strategy: 'fixed',
          placement: 'bottom-start',
          middleware: [offset(4), flip(), shift({ padding: 5 })],
        }).then(({ y }) => {
          Object.assign(this.dropdownEl.style, {
            top: `${y}px`,
          });
        });
      }
    }
    updateDisplayValue() {
      if (this.currentNumericValue === null || this.currentNumericValue === undefined || isNaN(this.currentNumericValue)) {
        this.displayValue = '';
        return;
      }
      const formattedValue = this.formatCurrency(this.currentNumericValue);
      this.displayValue = formattedValue;
    }
    /**
     * Get the decimal separator to use - custom prop takes priority over currency default
     */
    getDecimalSeparator() {
      var _a, _b, _c;
      return (_c = (_a = this.decimalSeparator) !== null && _a !== void 0 ? _a : (_b = this.selectedCurrency) === null || _b === void 0 ? void 0 : _b.decimalSeparator) !== null &&
        _c !== void 0
        ? _c
        : '.';
    }
    /**
     * Get the thousands separator to use - custom prop takes priority over currency default
     */
    getThousandsSeparator() {
      var _a, _b, _c;
      return (_c = (_a = this.thousandsSeparator) !== null && _a !== void 0 ? _a : (_b = this.selectedCurrency) === null || _b === void 0 ? void 0 : _b.thousandsSeparator) !==
        null && _c !== void 0
        ? _c
        : ',';
    }
    formatCurrency(amount) {
      if (isNaN(amount)) return '';
      // Use custom separators if provided, otherwise fall back to currency defaults
      const decimalSeparator = this.getDecimalSeparator();
      const thousandsSeparator = this.getThousandsSeparator();
      const isNegative = amount < 0;
      const absoluteAmount = Math.abs(amount);
      // Format the number with the specified precision
      const fixedAmount = Number(absoluteAmount).toFixed(this.precision);
      const [integerPart, decimalPart] = fixedAmount.split('.');
      // Add thousands separators
      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
      // Combine with decimal part if precision > 0
      let result = formattedInteger;
      if (this.precision > 0 && decimalPart) {
        result += decimalSeparator + decimalPart;
      }
      // Add negative sign if needed and allowed
      if (isNegative && this.allowNegative) {
        result = '-' + result;
      }
      return result;
    }
    parseFormattedValue(formattedValue) {
      if (!formattedValue) return 0;
      // Use custom separators if provided, otherwise fall back to currency defaults
      const decimalSeparator = this.getDecimalSeparator();
      const thousandsSeparator = this.getThousandsSeparator();
      const isNegative = formattedValue.startsWith('-') && this.allowNegative;
      // Remove negative sign temporarily for processing
      let cleanValue = formattedValue.replace('-', '');
      // Remove thousands separators and replace decimal separator with dot
      cleanValue = cleanValue.replace(new RegExp('\\' + thousandsSeparator, 'g'), '').replace(decimalSeparator, '.');
      // Remove non-numeric characters except decimal point
      cleanValue = cleanValue.replace(/[^0-9.]/g, '');
      const numericValue = parseFloat(cleanValue);
      const result = isNaN(numericValue) ? 0 : numericValue;
      return isNegative ? -result : result;
    }
    calculateNewCursorPosition(oldValue, newValue, oldCursorPosition, removedCharsBeforeCursor) {
      // Use custom thousands separator if provided, otherwise fall back to currency default
      const thousandsSeparator = this.getThousandsSeparator();
      let adjustedPosition = oldCursorPosition - removedCharsBeforeCursor;
      let oldSeparatorsBeforeCursor = 0;
      for (let i = 0; i < Math.min(adjustedPosition, oldValue.length); i++) {
        if (oldValue[i] === thousandsSeparator) {
          oldSeparatorsBeforeCursor++;
        }
      }
      let newSeparatorsBeforeCursor = 0;
      let digitCount = 0;
      let targetDigitPosition = adjustedPosition - oldSeparatorsBeforeCursor;
      for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] === thousandsSeparator) {
          newSeparatorsBeforeCursor++;
        } else if (newValue[i] >= '0' && newValue[i] <= '9') {
          digitCount++;
          if (digitCount >= targetDigitPosition) {
            return i + 1;
          }
        } else if (newValue[i] === this.getDecimalSeparator()) {
          if (digitCount >= targetDigitPosition) {
            return i + 1;
          }
        }
      }
      return Math.min(adjustedPosition + (newSeparatorsBeforeCursor - oldSeparatorsBeforeCursor), newValue.length);
    }
    handlePropsDecimalAndThousandsSeparator() {
      if (this.decimalSeparator && this.thousandsSeparator) {
        return false; // If both separators are provided, we assume custom formatting is required
      } else {
        return true;
      }
    }
    renderLabel() {
      if (this.label) {
        return h(
          'label',
          { class: 'tk-currency-input__label', htmlFor: this.uniqueId },
          h('span', { class: 'tk-currency-input__label-title' }, this.label),
          this.showAsterisk && h('span', { class: 'tk-currency-input__label-red-asterisk' }, '*'),
        );
      }
      return null;
    }
    renderCurrencyInput() {
      return h('input', {
        id: this.uniqueId,
        ref: el => (this.inputElement = el),
        type: 'text',
        class: 'tk-currency-input__input',
        autoComplete: 'off',
        value: this.displayValue,
        placeholder: this.placeholder,
        disabled: this.disabled,
        readonly: this.readonly,
        name: this.name,
        onInput: this.handleInput,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
      });
    }
    renderCurrencySelector() {
      return h(
        'div',
        { class: 'tk-currency-input__dropdown' },
        this.renderDropdownButton(),
        this.isDropdownOpen && h('div', { class: 'tk-currency-input__dropdown-menu', role: 'listbox', ref: el => (this.dropdownEl = el) }, this.renderCurrencyList()),
      );
    }
    renderDropdownButton() {
      var _a;
      return h(
        'button',
        { type: 'button', class: 'tk-currency-input__dropdown-button', onClick: event => this.toggleDropdown(event), disabled: this.disabled },
        h(
          'div',
          { class: 'tk-currency-input__dropdown-button-selected' },
          h('img', {
            src: 'https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png',
            alt: `${this.selectedCurrency.name} flag`,
            class: `flag flag-${this.selectedCurrency.id.toLowerCase()}`,
          }),
          h('span', { class: 'tk-currency-input__dropdown-button-currency-code' }, (_a = this.selectedCurrency) === null || _a === void 0 ? void 0 : _a.code),
          h('tk-icon', Object.assign({}, getIconElementProps('stat_minus_1', { variant: null, size: 'large' }, undefined, 'span'))),
        ),
      );
    }
    renderCurrencyList() {
      const currencies = this.getCurrencies();
      return h(
        'ul',
        { class: 'tk-currency-input__dropdown-menu-list' },
        currencies.map(currency =>
          h(
            'li',
            {
              'class': 'tk-currency-input__dropdown-menu-list-item',
              'key': currency.code,
              'role': 'option',
              'onClick': event => this.handleSelectCurrency(currency.code, event),
              'aria-selected': this.selectedCurrency.code === currency.code,
            },
            h('img', {
              src: 'https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png',
              alt: `${currency.code} flag`,
              class: `flag flag-${currency.id.toLowerCase()}`,
            }),
            h('span', { class: 'tk-currency-input__dropdown-menu-list-country-label' }, currency.symbol),
            h('span', { class: 'tk-currency-input__dropdown-menu-list-dial-id' }, currency.name),
          ),
        ),
      );
    }
    renderHint() {
      var _a, _b;
      let hint;
      if (((_a = this.hint) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const hintIcon = h('tk-icon', Object.assign({}, getIconElementProps('info', { class: 'tk-currency-input__hint-icon', variant: null })));
        hint = h('span', { class: 'tk-currency-input__hint' }, hintIcon, h('span', { class: 'tk-currency-input__hint-text' }, this.hint));
      }
      if (((_b = this.error) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        const hintIcon = h('tk-icon', Object.assign({}, getIconElementProps('info', { class: 'tk-currency-input__hint-icon', variant: null })));
        hint = h('span', { class: 'tk-currency-input__hint' }, hintIcon, h('span', { class: 'tk-currency-input__hint-text' }, this.error));
      }
      return hint;
    }
    render() {
      return h(
        'div',
        {
          'key': '3532c3d749155b8664c42524a6623b91e78e9ac3',
          'class': classNames('tk-currency-input', `tk-currency-input--${this.size}`),
          'aria-invalid': this.invalid,
          'aria-disabled': this.disabled,
          'aria-readonly': this.readonly,
        },
        this.renderLabel(),
        h(
          'div',
          { key: '62b9252b46f1f71a69cd5f0d8f3ada89f8e6df25', class: 'tk-currency-input__wrapper' },
          this.renderCurrencyInput(),
          this.handlePropsDecimalAndThousandsSeparator() && this.renderCurrencySelector(),
        ),
        this.renderHint(),
      );
    }
    static get formAssociated() {
      return true;
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        value: ['valueChanged'],
        defaultCurrency: ['defaultCurrencyChanged'],
      };
    }
    static get style() {
      return tkCurrencyInputCss + flagCss;
    }
  },
  [
    64,
    'tk-currency-input',
    {
      value: [2],
      currencyList: [16, 'currency-list'],
      placeholder: [1],
      disabled: [4],
      invalid: [4],
      readonly: [4],
      size: [1],
      showAsterisk: [4, 'show-asterisk'],
      precision: [2],
      defaultCurrency: [1, 'default-currency'],
      allowNegative: [4, 'allow-negative'],
      decimalSeparator: [1, 'decimal-separator'],
      thousandsSeparator: [1, 'thousands-separator'],
      label: [1],
      name: [1],
      hint: [1],
      error: [1],
      selectedCurrency: [32],
      displayValue: [32],
      isDropdownOpen: [32],
      currentNumericValue: [32],
    },
    undefined,
    {
      value: ['valueChanged'],
      defaultCurrency: ['defaultCurrencyChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-currency-input', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-currency-input':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkCurrencyInput$1);
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkCurrencyInput = TkCurrencyInput$1;
const defineCustomElement = defineCustomElement$1;

export { TkCurrencyInput, defineCustomElement };
//# sourceMappingURL=tk-currency-input.js.map

//# sourceMappingURL=tk-currency-input.js.map
