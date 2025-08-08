import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-CsLMRZQo.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$4 } from './p-DFQnxT5R.js';
import { d as defineCustomElement$3 } from './p-vR69rcDp.js';
import { d as defineCustomElement$2 } from './p-CEvspPP4.js';

const types$1 = {
  'application/prs.cww': ['cww'],
  'application/prs.xsf+xml': ['xsf'],
  'application/vnd.1000minds.decision-model+xml': ['1km'],
  'application/vnd.3gpp.pic-bw-large': ['plb'],
  'application/vnd.3gpp.pic-bw-small': ['psb'],
  'application/vnd.3gpp.pic-bw-var': ['pvb'],
  'application/vnd.3gpp2.tcap': ['tcap'],
  'application/vnd.3m.post-it-notes': ['pwn'],
  'application/vnd.accpac.simply.aso': ['aso'],
  'application/vnd.accpac.simply.imp': ['imp'],
  'application/vnd.acucobol': ['acu'],
  'application/vnd.acucorp': ['atc', 'acutc'],
  'application/vnd.adobe.air-application-installer-package+zip': ['air'],
  'application/vnd.adobe.formscentral.fcdt': ['fcdt'],
  'application/vnd.adobe.fxp': ['fxp', 'fxpl'],
  'application/vnd.adobe.xdp+xml': ['xdp'],
  'application/vnd.adobe.xfdf': ['*xfdf'],
  'application/vnd.age': ['age'],
  'application/vnd.ahead.space': ['ahead'],
  'application/vnd.airzip.filesecure.azf': ['azf'],
  'application/vnd.airzip.filesecure.azs': ['azs'],
  'application/vnd.amazon.ebook': ['azw'],
  'application/vnd.americandynamics.acc': ['acc'],
  'application/vnd.amiga.ami': ['ami'],
  'application/vnd.android.package-archive': ['apk'],
  'application/vnd.anser-web-certificate-issue-initiation': ['cii'],
  'application/vnd.anser-web-funds-transfer-initiation': ['fti'],
  'application/vnd.antix.game-component': ['atx'],
  'application/vnd.apple.installer+xml': ['mpkg'],
  'application/vnd.apple.keynote': ['key'],
  'application/vnd.apple.mpegurl': ['m3u8'],
  'application/vnd.apple.numbers': ['numbers'],
  'application/vnd.apple.pages': ['pages'],
  'application/vnd.apple.pkpass': ['pkpass'],
  'application/vnd.aristanetworks.swi': ['swi'],
  'application/vnd.astraea-software.iota': ['iota'],
  'application/vnd.audiograph': ['aep'],
  'application/vnd.autodesk.fbx': ['fbx'],
  'application/vnd.balsamiq.bmml+xml': ['bmml'],
  'application/vnd.blueice.multipass': ['mpm'],
  'application/vnd.bmi': ['bmi'],
  'application/vnd.businessobjects': ['rep'],
  'application/vnd.chemdraw+xml': ['cdxml'],
  'application/vnd.chipnuts.karaoke-mmd': ['mmd'],
  'application/vnd.cinderella': ['cdy'],
  'application/vnd.citationstyles.style+xml': ['csl'],
  'application/vnd.claymore': ['cla'],
  'application/vnd.cloanto.rp9': ['rp9'],
  'application/vnd.clonk.c4group': ['c4g', 'c4d', 'c4f', 'c4p', 'c4u'],
  'application/vnd.cluetrust.cartomobile-config': ['c11amc'],
  'application/vnd.cluetrust.cartomobile-config-pkg': ['c11amz'],
  'application/vnd.commonspace': ['csp'],
  'application/vnd.contact.cmsg': ['cdbcmsg'],
  'application/vnd.cosmocaller': ['cmc'],
  'application/vnd.crick.clicker': ['clkx'],
  'application/vnd.crick.clicker.keyboard': ['clkk'],
  'application/vnd.crick.clicker.palette': ['clkp'],
  'application/vnd.crick.clicker.template': ['clkt'],
  'application/vnd.crick.clicker.wordbank': ['clkw'],
  'application/vnd.criticaltools.wbs+xml': ['wbs'],
  'application/vnd.ctc-posml': ['pml'],
  'application/vnd.cups-ppd': ['ppd'],
  'application/vnd.curl.car': ['car'],
  'application/vnd.curl.pcurl': ['pcurl'],
  'application/vnd.dart': ['dart'],
  'application/vnd.data-vision.rdz': ['rdz'],
  'application/vnd.dbf': ['dbf'],
  'application/vnd.dcmp+xml': ['dcmp'],
  'application/vnd.dece.data': ['uvf', 'uvvf', 'uvd', 'uvvd'],
  'application/vnd.dece.ttml+xml': ['uvt', 'uvvt'],
  'application/vnd.dece.unspecified': ['uvx', 'uvvx'],
  'application/vnd.dece.zip': ['uvz', 'uvvz'],
  'application/vnd.denovo.fcselayout-link': ['fe_launch'],
  'application/vnd.dna': ['dna'],
  'application/vnd.dolby.mlp': ['mlp'],
  'application/vnd.dpgraph': ['dpg'],
  'application/vnd.dreamfactory': ['dfac'],
  'application/vnd.ds-keypoint': ['kpxx'],
  'application/vnd.dvb.ait': ['ait'],
  'application/vnd.dvb.service': ['svc'],
  'application/vnd.dynageo': ['geo'],
  'application/vnd.ecowin.chart': ['mag'],
  'application/vnd.enliven': ['nml'],
  'application/vnd.epson.esf': ['esf'],
  'application/vnd.epson.msf': ['msf'],
  'application/vnd.epson.quickanime': ['qam'],
  'application/vnd.epson.salt': ['slt'],
  'application/vnd.epson.ssf': ['ssf'],
  'application/vnd.eszigno3+xml': ['es3', 'et3'],
  'application/vnd.ezpix-album': ['ez2'],
  'application/vnd.ezpix-package': ['ez3'],
  'application/vnd.fdf': ['*fdf'],
  'application/vnd.fdsn.mseed': ['mseed'],
  'application/vnd.fdsn.seed': ['seed', 'dataless'],
  'application/vnd.flographit': ['gph'],
  'application/vnd.fluxtime.clip': ['ftc'],
  'application/vnd.framemaker': ['fm', 'frame', 'maker', 'book'],
  'application/vnd.frogans.fnc': ['fnc'],
  'application/vnd.frogans.ltf': ['ltf'],
  'application/vnd.fsc.weblaunch': ['fsc'],
  'application/vnd.fujitsu.oasys': ['oas'],
  'application/vnd.fujitsu.oasys2': ['oa2'],
  'application/vnd.fujitsu.oasys3': ['oa3'],
  'application/vnd.fujitsu.oasysgp': ['fg5'],
  'application/vnd.fujitsu.oasysprs': ['bh2'],
  'application/vnd.fujixerox.ddd': ['ddd'],
  'application/vnd.fujixerox.docuworks': ['xdw'],
  'application/vnd.fujixerox.docuworks.binder': ['xbd'],
  'application/vnd.fuzzysheet': ['fzs'],
  'application/vnd.genomatix.tuxedo': ['txd'],
  'application/vnd.geogebra.file': ['ggb'],
  'application/vnd.geogebra.slides': ['ggs'],
  'application/vnd.geogebra.tool': ['ggt'],
  'application/vnd.geometry-explorer': ['gex', 'gre'],
  'application/vnd.geonext': ['gxt'],
  'application/vnd.geoplan': ['g2w'],
  'application/vnd.geospace': ['g3w'],
  'application/vnd.gmx': ['gmx'],
  'application/vnd.google-apps.document': ['gdoc'],
  'application/vnd.google-apps.drawing': ['gdraw'],
  'application/vnd.google-apps.form': ['gform'],
  'application/vnd.google-apps.jam': ['gjam'],
  'application/vnd.google-apps.map': ['gmap'],
  'application/vnd.google-apps.presentation': ['gslides'],
  'application/vnd.google-apps.script': ['gscript'],
  'application/vnd.google-apps.site': ['gsite'],
  'application/vnd.google-apps.spreadsheet': ['gsheet'],
  'application/vnd.google-earth.kml+xml': ['kml'],
  'application/vnd.google-earth.kmz': ['kmz'],
  'application/vnd.gov.sk.xmldatacontainer+xml': ['xdcf'],
  'application/vnd.grafeq': ['gqf', 'gqs'],
  'application/vnd.groove-account': ['gac'],
  'application/vnd.groove-help': ['ghf'],
  'application/vnd.groove-identity-message': ['gim'],
  'application/vnd.groove-injector': ['grv'],
  'application/vnd.groove-tool-message': ['gtm'],
  'application/vnd.groove-tool-template': ['tpl'],
  'application/vnd.groove-vcard': ['vcg'],
  'application/vnd.hal+xml': ['hal'],
  'application/vnd.handheld-entertainment+xml': ['zmm'],
  'application/vnd.hbci': ['hbci'],
  'application/vnd.hhe.lesson-player': ['les'],
  'application/vnd.hp-hpgl': ['hpgl'],
  'application/vnd.hp-hpid': ['hpid'],
  'application/vnd.hp-hps': ['hps'],
  'application/vnd.hp-jlyt': ['jlt'],
  'application/vnd.hp-pcl': ['pcl'],
  'application/vnd.hp-pclxl': ['pclxl'],
  'application/vnd.hydrostatix.sof-data': ['sfd-hdstx'],
  'application/vnd.ibm.minipay': ['mpy'],
  'application/vnd.ibm.modcap': ['afp', 'listafp', 'list3820'],
  'application/vnd.ibm.rights-management': ['irm'],
  'application/vnd.ibm.secure-container': ['sc'],
  'application/vnd.iccprofile': ['icc', 'icm'],
  'application/vnd.igloader': ['igl'],
  'application/vnd.immervision-ivp': ['ivp'],
  'application/vnd.immervision-ivu': ['ivu'],
  'application/vnd.insors.igm': ['igm'],
  'application/vnd.intercon.formnet': ['xpw', 'xpx'],
  'application/vnd.intergeo': ['i2g'],
  'application/vnd.intu.qbo': ['qbo'],
  'application/vnd.intu.qfx': ['qfx'],
  'application/vnd.ipunplugged.rcprofile': ['rcprofile'],
  'application/vnd.irepository.package+xml': ['irp'],
  'application/vnd.is-xpr': ['xpr'],
  'application/vnd.isac.fcs': ['fcs'],
  'application/vnd.jam': ['jam'],
  'application/vnd.jcp.javame.midlet-rms': ['rms'],
  'application/vnd.jisp': ['jisp'],
  'application/vnd.joost.joda-archive': ['joda'],
  'application/vnd.kahootz': ['ktz', 'ktr'],
  'application/vnd.kde.karbon': ['karbon'],
  'application/vnd.kde.kchart': ['chrt'],
  'application/vnd.kde.kformula': ['kfo'],
  'application/vnd.kde.kivio': ['flw'],
  'application/vnd.kde.kontour': ['kon'],
  'application/vnd.kde.kpresenter': ['kpr', 'kpt'],
  'application/vnd.kde.kspread': ['ksp'],
  'application/vnd.kde.kword': ['kwd', 'kwt'],
  'application/vnd.kenameaapp': ['htke'],
  'application/vnd.kidspiration': ['kia'],
  'application/vnd.kinar': ['kne', 'knp'],
  'application/vnd.koan': ['skp', 'skd', 'skt', 'skm'],
  'application/vnd.kodak-descriptor': ['sse'],
  'application/vnd.las.las+xml': ['lasxml'],
  'application/vnd.llamagraphics.life-balance.desktop': ['lbd'],
  'application/vnd.llamagraphics.life-balance.exchange+xml': ['lbe'],
  'application/vnd.lotus-1-2-3': ['123'],
  'application/vnd.lotus-approach': ['apr'],
  'application/vnd.lotus-freelance': ['pre'],
  'application/vnd.lotus-notes': ['nsf'],
  'application/vnd.lotus-organizer': ['org'],
  'application/vnd.lotus-screencam': ['scm'],
  'application/vnd.lotus-wordpro': ['lwp'],
  'application/vnd.macports.portpkg': ['portpkg'],
  'application/vnd.mapbox-vector-tile': ['mvt'],
  'application/vnd.mcd': ['mcd'],
  'application/vnd.medcalcdata': ['mc1'],
  'application/vnd.mediastation.cdkey': ['cdkey'],
  'application/vnd.mfer': ['mwf'],
  'application/vnd.mfmp': ['mfm'],
  'application/vnd.micrografx.flo': ['flo'],
  'application/vnd.micrografx.igx': ['igx'],
  'application/vnd.mif': ['mif'],
  'application/vnd.mobius.daf': ['daf'],
  'application/vnd.mobius.dis': ['dis'],
  'application/vnd.mobius.mbk': ['mbk'],
  'application/vnd.mobius.mqy': ['mqy'],
  'application/vnd.mobius.msl': ['msl'],
  'application/vnd.mobius.plc': ['plc'],
  'application/vnd.mobius.txf': ['txf'],
  'application/vnd.mophun.application': ['mpn'],
  'application/vnd.mophun.certificate': ['mpc'],
  'application/vnd.mozilla.xul+xml': ['xul'],
  'application/vnd.ms-artgalry': ['cil'],
  'application/vnd.ms-cab-compressed': ['cab'],
  'application/vnd.ms-excel': ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
  'application/vnd.ms-excel.addin.macroenabled.12': ['xlam'],
  'application/vnd.ms-excel.sheet.binary.macroenabled.12': ['xlsb'],
  'application/vnd.ms-excel.sheet.macroenabled.12': ['xlsm'],
  'application/vnd.ms-excel.template.macroenabled.12': ['xltm'],
  'application/vnd.ms-fontobject': ['eot'],
  'application/vnd.ms-htmlhelp': ['chm'],
  'application/vnd.ms-ims': ['ims'],
  'application/vnd.ms-lrm': ['lrm'],
  'application/vnd.ms-officetheme': ['thmx'],
  'application/vnd.ms-outlook': ['msg'],
  'application/vnd.ms-pki.seccat': ['cat'],
  'application/vnd.ms-pki.stl': ['*stl'],
  'application/vnd.ms-powerpoint': ['ppt', 'pps', 'pot'],
  'application/vnd.ms-powerpoint.addin.macroenabled.12': ['ppam'],
  'application/vnd.ms-powerpoint.presentation.macroenabled.12': ['pptm'],
  'application/vnd.ms-powerpoint.slide.macroenabled.12': ['sldm'],
  'application/vnd.ms-powerpoint.slideshow.macroenabled.12': ['ppsm'],
  'application/vnd.ms-powerpoint.template.macroenabled.12': ['potm'],
  'application/vnd.ms-project': ['*mpp', 'mpt'],
  'application/vnd.ms-visio.viewer': ['vdx'],
  'application/vnd.ms-word.document.macroenabled.12': ['docm'],
  'application/vnd.ms-word.template.macroenabled.12': ['dotm'],
  'application/vnd.ms-works': ['wps', 'wks', 'wcm', 'wdb'],
  'application/vnd.ms-wpl': ['wpl'],
  'application/vnd.ms-xpsdocument': ['xps'],
  'application/vnd.mseq': ['mseq'],
  'application/vnd.musician': ['mus'],
  'application/vnd.muvee.style': ['msty'],
  'application/vnd.mynfc': ['taglet'],
  'application/vnd.nato.bindingdataobject+xml': ['bdo'],
  'application/vnd.neurolanguage.nlu': ['nlu'],
  'application/vnd.nitf': ['ntf', 'nitf'],
  'application/vnd.noblenet-directory': ['nnd'],
  'application/vnd.noblenet-sealer': ['nns'],
  'application/vnd.noblenet-web': ['nnw'],
  'application/vnd.nokia.n-gage.ac+xml': ['*ac'],
  'application/vnd.nokia.n-gage.data': ['ngdat'],
  'application/vnd.nokia.n-gage.symbian.install': ['n-gage'],
  'application/vnd.nokia.radio-preset': ['rpst'],
  'application/vnd.nokia.radio-presets': ['rpss'],
  'application/vnd.novadigm.edm': ['edm'],
  'application/vnd.novadigm.edx': ['edx'],
  'application/vnd.novadigm.ext': ['ext'],
  'application/vnd.oasis.opendocument.chart': ['odc'],
  'application/vnd.oasis.opendocument.chart-template': ['otc'],
  'application/vnd.oasis.opendocument.database': ['odb'],
  'application/vnd.oasis.opendocument.formula': ['odf'],
  'application/vnd.oasis.opendocument.formula-template': ['odft'],
  'application/vnd.oasis.opendocument.graphics': ['odg'],
  'application/vnd.oasis.opendocument.graphics-template': ['otg'],
  'application/vnd.oasis.opendocument.image': ['odi'],
  'application/vnd.oasis.opendocument.image-template': ['oti'],
  'application/vnd.oasis.opendocument.presentation': ['odp'],
  'application/vnd.oasis.opendocument.presentation-template': ['otp'],
  'application/vnd.oasis.opendocument.spreadsheet': ['ods'],
  'application/vnd.oasis.opendocument.spreadsheet-template': ['ots'],
  'application/vnd.oasis.opendocument.text': ['odt'],
  'application/vnd.oasis.opendocument.text-master': ['odm'],
  'application/vnd.oasis.opendocument.text-template': ['ott'],
  'application/vnd.oasis.opendocument.text-web': ['oth'],
  'application/vnd.olpc-sugar': ['xo'],
  'application/vnd.oma.dd2+xml': ['dd2'],
  'application/vnd.openblox.game+xml': ['obgx'],
  'application/vnd.openofficeorg.extension': ['oxt'],
  'application/vnd.openstreetmap.data+xml': ['osm'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx'],
  'application/vnd.openxmlformats-officedocument.presentationml.slide': ['sldx'],
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow': ['ppsx'],
  'application/vnd.openxmlformats-officedocument.presentationml.template': ['potx'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template': ['xltx'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template': ['dotx'],
  'application/vnd.osgeo.mapguide.package': ['mgp'],
  'application/vnd.osgi.dp': ['dp'],
  'application/vnd.osgi.subsystem': ['esa'],
  'application/vnd.palm': ['pdb', 'pqa', 'oprc'],
  'application/vnd.pawaafile': ['paw'],
  'application/vnd.pg.format': ['str'],
  'application/vnd.pg.osasli': ['ei6'],
  'application/vnd.picsel': ['efif'],
  'application/vnd.pmi.widget': ['wg'],
  'application/vnd.pocketlearn': ['plf'],
  'application/vnd.powerbuilder6': ['pbd'],
  'application/vnd.previewsystems.box': ['box'],
  'application/vnd.procrate.brushset': ['brushset'],
  'application/vnd.procreate.brush': ['brush'],
  'application/vnd.procreate.dream': ['drm'],
  'application/vnd.proteus.magazine': ['mgz'],
  'application/vnd.publishare-delta-tree': ['qps'],
  'application/vnd.pvi.ptid1': ['ptid'],
  'application/vnd.pwg-xhtml-print+xml': ['xhtm'],
  'application/vnd.quark.quarkxpress': ['qxd', 'qxt', 'qwd', 'qwt', 'qxl', 'qxb'],
  'application/vnd.rar': ['rar'],
  'application/vnd.realvnc.bed': ['bed'],
  'application/vnd.recordare.musicxml': ['mxl'],
  'application/vnd.recordare.musicxml+xml': ['musicxml'],
  'application/vnd.rig.cryptonote': ['cryptonote'],
  'application/vnd.rim.cod': ['cod'],
  'application/vnd.rn-realmedia': ['rm'],
  'application/vnd.rn-realmedia-vbr': ['rmvb'],
  'application/vnd.route66.link66+xml': ['link66'],
  'application/vnd.sailingtracker.track': ['st'],
  'application/vnd.seemail': ['see'],
  'application/vnd.sema': ['sema'],
  'application/vnd.semd': ['semd'],
  'application/vnd.semf': ['semf'],
  'application/vnd.shana.informed.formdata': ['ifm'],
  'application/vnd.shana.informed.formtemplate': ['itp'],
  'application/vnd.shana.informed.interchange': ['iif'],
  'application/vnd.shana.informed.package': ['ipk'],
  'application/vnd.simtech-mindmapper': ['twd', 'twds'],
  'application/vnd.smaf': ['mmf'],
  'application/vnd.smart.teacher': ['teacher'],
  'application/vnd.software602.filler.form+xml': ['fo'],
  'application/vnd.solent.sdkm+xml': ['sdkm', 'sdkd'],
  'application/vnd.spotfire.dxp': ['dxp'],
  'application/vnd.spotfire.sfs': ['sfs'],
  'application/vnd.stardivision.calc': ['sdc'],
  'application/vnd.stardivision.draw': ['sda'],
  'application/vnd.stardivision.impress': ['sdd'],
  'application/vnd.stardivision.math': ['smf'],
  'application/vnd.stardivision.writer': ['sdw', 'vor'],
  'application/vnd.stardivision.writer-global': ['sgl'],
  'application/vnd.stepmania.package': ['smzip'],
  'application/vnd.stepmania.stepchart': ['sm'],
  'application/vnd.sun.wadl+xml': ['wadl'],
  'application/vnd.sun.xml.calc': ['sxc'],
  'application/vnd.sun.xml.calc.template': ['stc'],
  'application/vnd.sun.xml.draw': ['sxd'],
  'application/vnd.sun.xml.draw.template': ['std'],
  'application/vnd.sun.xml.impress': ['sxi'],
  'application/vnd.sun.xml.impress.template': ['sti'],
  'application/vnd.sun.xml.math': ['sxm'],
  'application/vnd.sun.xml.writer': ['sxw'],
  'application/vnd.sun.xml.writer.global': ['sxg'],
  'application/vnd.sun.xml.writer.template': ['stw'],
  'application/vnd.sus-calendar': ['sus', 'susp'],
  'application/vnd.svd': ['svd'],
  'application/vnd.symbian.install': ['sis', 'sisx'],
  'application/vnd.syncml+xml': ['xsm'],
  'application/vnd.syncml.dm+wbxml': ['bdm'],
  'application/vnd.syncml.dm+xml': ['xdm'],
  'application/vnd.syncml.dmddf+xml': ['ddf'],
  'application/vnd.tao.intent-module-archive': ['tao'],
  'application/vnd.tcpdump.pcap': ['pcap', 'cap', 'dmp'],
  'application/vnd.tmobile-livetv': ['tmo'],
  'application/vnd.trid.tpt': ['tpt'],
  'application/vnd.triscape.mxs': ['mxs'],
  'application/vnd.trueapp': ['tra'],
  'application/vnd.ufdl': ['ufd', 'ufdl'],
  'application/vnd.uiq.theme': ['utz'],
  'application/vnd.umajin': ['umj'],
  'application/vnd.unity': ['unityweb'],
  'application/vnd.uoml+xml': ['uoml', 'uo'],
  'application/vnd.vcx': ['vcx'],
  'application/vnd.visio': ['vsd', 'vst', 'vss', 'vsw', 'vsdx', 'vtx'],
  'application/vnd.visionary': ['vis'],
  'application/vnd.vsf': ['vsf'],
  'application/vnd.wap.wbxml': ['wbxml'],
  'application/vnd.wap.wmlc': ['wmlc'],
  'application/vnd.wap.wmlscriptc': ['wmlsc'],
  'application/vnd.webturbo': ['wtb'],
  'application/vnd.wolfram.player': ['nbp'],
  'application/vnd.wordperfect': ['wpd'],
  'application/vnd.wqd': ['wqd'],
  'application/vnd.wt.stf': ['stf'],
  'application/vnd.xara': ['xar'],
  'application/vnd.xfdl': ['xfdl'],
  'application/vnd.yamaha.hv-dic': ['hvd'],
  'application/vnd.yamaha.hv-script': ['hvs'],
  'application/vnd.yamaha.hv-voice': ['hvp'],
  'application/vnd.yamaha.openscoreformat': ['osf'],
  'application/vnd.yamaha.openscoreformat.osfpvg+xml': ['osfpvg'],
  'application/vnd.yamaha.smaf-audio': ['saf'],
  'application/vnd.yamaha.smaf-phrase': ['spf'],
  'application/vnd.yellowriver-custom-menu': ['cmp'],
  'application/vnd.zul': ['zir', 'zirz'],
  'application/vnd.zzazz.deck+xml': ['zaz'],
  'application/x-7z-compressed': ['7z'],
  'application/x-abiword': ['abw'],
  'application/x-ace-compressed': ['ace'],
  'application/x-apple-diskimage': ['*dmg'],
  'application/x-arj': ['arj'],
  'application/x-authorware-bin': ['aab', 'x32', 'u32', 'vox'],
  'application/x-authorware-map': ['aam'],
  'application/x-authorware-seg': ['aas'],
  'application/x-bcpio': ['bcpio'],
  'application/x-bdoc': ['*bdoc'],
  'application/x-bittorrent': ['torrent'],
  'application/x-blender': ['blend'],
  'application/x-blorb': ['blb', 'blorb'],
  'application/x-bzip': ['bz'],
  'application/x-bzip2': ['bz2', 'boz'],
  'application/x-cbr': ['cbr', 'cba', 'cbt', 'cbz', 'cb7'],
  'application/x-cdlink': ['vcd'],
  'application/x-cfs-compressed': ['cfs'],
  'application/x-chat': ['chat'],
  'application/x-chess-pgn': ['pgn'],
  'application/x-chrome-extension': ['crx'],
  'application/x-cocoa': ['cco'],
  'application/x-compressed': ['*rar'],
  'application/x-conference': ['nsc'],
  'application/x-cpio': ['cpio'],
  'application/x-csh': ['csh'],
  'application/x-debian-package': ['*deb', 'udeb'],
  'application/x-dgc-compressed': ['dgc'],
  'application/x-director': ['dir', 'dcr', 'dxr', 'cst', 'cct', 'cxt', 'w3d', 'fgd', 'swa'],
  'application/x-doom': ['wad'],
  'application/x-dtbncx+xml': ['ncx'],
  'application/x-dtbook+xml': ['dtb'],
  'application/x-dtbresource+xml': ['res'],
  'application/x-dvi': ['dvi'],
  'application/x-envoy': ['evy'],
  'application/x-eva': ['eva'],
  'application/x-font-bdf': ['bdf'],
  'application/x-font-ghostscript': ['gsf'],
  'application/x-font-linux-psf': ['psf'],
  'application/x-font-pcf': ['pcf'],
  'application/x-font-snf': ['snf'],
  'application/x-font-type1': ['pfa', 'pfb', 'pfm', 'afm'],
  'application/x-freearc': ['arc'],
  'application/x-futuresplash': ['spl'],
  'application/x-gca-compressed': ['gca'],
  'application/x-glulx': ['ulx'],
  'application/x-gnumeric': ['gnumeric'],
  'application/x-gramps-xml': ['gramps'],
  'application/x-gtar': ['gtar'],
  'application/x-hdf': ['hdf'],
  'application/x-httpd-php': ['php'],
  'application/x-install-instructions': ['install'],
  'application/x-ipynb+json': ['ipynb'],
  'application/x-iso9660-image': ['*iso'],
  'application/x-iwork-keynote-sffkey': ['*key'],
  'application/x-iwork-numbers-sffnumbers': ['*numbers'],
  'application/x-iwork-pages-sffpages': ['*pages'],
  'application/x-java-archive-diff': ['jardiff'],
  'application/x-java-jnlp-file': ['jnlp'],
  'application/x-keepass2': ['kdbx'],
  'application/x-latex': ['latex'],
  'application/x-lua-bytecode': ['luac'],
  'application/x-lzh-compressed': ['lzh', 'lha'],
  'application/x-makeself': ['run'],
  'application/x-mie': ['mie'],
  'application/x-mobipocket-ebook': ['*prc', 'mobi'],
  'application/x-ms-application': ['application'],
  'application/x-ms-shortcut': ['lnk'],
  'application/x-ms-wmd': ['wmd'],
  'application/x-ms-wmz': ['wmz'],
  'application/x-ms-xbap': ['xbap'],
  'application/x-msaccess': ['mdb'],
  'application/x-msbinder': ['obd'],
  'application/x-mscardfile': ['crd'],
  'application/x-msclip': ['clp'],
  'application/x-msdos-program': ['*exe'],
  'application/x-msdownload': ['*exe', '*dll', 'com', 'bat', '*msi'],
  'application/x-msmediaview': ['mvb', 'm13', 'm14'],
  'application/x-msmetafile': ['*wmf', '*wmz', '*emf', 'emz'],
  'application/x-msmoney': ['mny'],
  'application/x-mspublisher': ['pub'],
  'application/x-msschedule': ['scd'],
  'application/x-msterminal': ['trm'],
  'application/x-mswrite': ['wri'],
  'application/x-netcdf': ['nc', 'cdf'],
  'application/x-ns-proxy-autoconfig': ['pac'],
  'application/x-nzb': ['nzb'],
  'application/x-perl': ['pl', 'pm'],
  'application/x-pilot': ['*prc', '*pdb'],
  'application/x-pkcs12': ['p12', 'pfx'],
  'application/x-pkcs7-certificates': ['p7b', 'spc'],
  'application/x-pkcs7-certreqresp': ['p7r'],
  'application/x-rar-compressed': ['*rar'],
  'application/x-redhat-package-manager': ['rpm'],
  'application/x-research-info-systems': ['ris'],
  'application/x-sea': ['sea'],
  'application/x-sh': ['sh'],
  'application/x-shar': ['shar'],
  'application/x-shockwave-flash': ['swf'],
  'application/x-silverlight-app': ['xap'],
  'application/x-sql': ['*sql'],
  'application/x-stuffit': ['sit'],
  'application/x-stuffitx': ['sitx'],
  'application/x-subrip': ['srt'],
  'application/x-sv4cpio': ['sv4cpio'],
  'application/x-sv4crc': ['sv4crc'],
  'application/x-t3vm-image': ['t3'],
  'application/x-tads': ['gam'],
  'application/x-tar': ['tar'],
  'application/x-tcl': ['tcl', 'tk'],
  'application/x-tex': ['tex'],
  'application/x-tex-tfm': ['tfm'],
  'application/x-texinfo': ['texinfo', 'texi'],
  'application/x-tgif': ['*obj'],
  'application/x-ustar': ['ustar'],
  'application/x-virtualbox-hdd': ['hdd'],
  'application/x-virtualbox-ova': ['ova'],
  'application/x-virtualbox-ovf': ['ovf'],
  'application/x-virtualbox-vbox': ['vbox'],
  'application/x-virtualbox-vbox-extpack': ['vbox-extpack'],
  'application/x-virtualbox-vdi': ['vdi'],
  'application/x-virtualbox-vhd': ['vhd'],
  'application/x-virtualbox-vmdk': ['vmdk'],
  'application/x-wais-source': ['src'],
  'application/x-web-app-manifest+json': ['webapp'],
  'application/x-x509-ca-cert': ['der', 'crt', 'pem'],
  'application/x-xfig': ['fig'],
  'application/x-xliff+xml': ['*xlf'],
  'application/x-xpinstall': ['xpi'],
  'application/x-xz': ['xz'],
  'application/x-zip-compressed': ['*zip'],
  'application/x-zmachine': ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7', 'z8'],
  'audio/vnd.dece.audio': ['uva', 'uvva'],
  'audio/vnd.digital-winds': ['eol'],
  'audio/vnd.dra': ['dra'],
  'audio/vnd.dts': ['dts'],
  'audio/vnd.dts.hd': ['dtshd'],
  'audio/vnd.lucent.voice': ['lvp'],
  'audio/vnd.ms-playready.media.pya': ['pya'],
  'audio/vnd.nuera.ecelp4800': ['ecelp4800'],
  'audio/vnd.nuera.ecelp7470': ['ecelp7470'],
  'audio/vnd.nuera.ecelp9600': ['ecelp9600'],
  'audio/vnd.rip': ['rip'],
  'audio/x-aac': ['*aac'],
  'audio/x-aiff': ['aif', 'aiff', 'aifc'],
  'audio/x-caf': ['caf'],
  'audio/x-flac': ['flac'],
  'audio/x-m4a': ['*m4a'],
  'audio/x-matroska': ['mka'],
  'audio/x-mpegurl': ['m3u'],
  'audio/x-ms-wax': ['wax'],
  'audio/x-ms-wma': ['wma'],
  'audio/x-pn-realaudio': ['ram', 'ra'],
  'audio/x-pn-realaudio-plugin': ['rmp'],
  'audio/x-realaudio': ['*ra'],
  'audio/x-wav': ['*wav'],
  'chemical/x-cdx': ['cdx'],
  'chemical/x-cif': ['cif'],
  'chemical/x-cmdf': ['cmdf'],
  'chemical/x-cml': ['cml'],
  'chemical/x-csml': ['csml'],
  'chemical/x-xyz': ['xyz'],
  'image/prs.btif': ['btif', 'btf'],
  'image/prs.pti': ['pti'],
  'image/vnd.adobe.photoshop': ['psd'],
  'image/vnd.airzip.accelerator.azv': ['azv'],
  'image/vnd.dece.graphic': ['uvi', 'uvvi', 'uvg', 'uvvg'],
  'image/vnd.djvu': ['djvu', 'djv'],
  'image/vnd.dvb.subtitle': ['*sub'],
  'image/vnd.dwg': ['dwg'],
  'image/vnd.dxf': ['dxf'],
  'image/vnd.fastbidsheet': ['fbs'],
  'image/vnd.fpx': ['fpx'],
  'image/vnd.fst': ['fst'],
  'image/vnd.fujixerox.edmics-mmr': ['mmr'],
  'image/vnd.fujixerox.edmics-rlc': ['rlc'],
  'image/vnd.microsoft.icon': ['ico'],
  'image/vnd.ms-dds': ['dds'],
  'image/vnd.ms-modi': ['mdi'],
  'image/vnd.ms-photo': ['wdp'],
  'image/vnd.net-fpx': ['npx'],
  'image/vnd.pco.b16': ['b16'],
  'image/vnd.tencent.tap': ['tap'],
  'image/vnd.valve.source.texture': ['vtf'],
  'image/vnd.wap.wbmp': ['wbmp'],
  'image/vnd.xiff': ['xif'],
  'image/vnd.zbrush.pcx': ['pcx'],
  'image/x-3ds': ['3ds'],
  'image/x-adobe-dng': ['dng'],
  'image/x-cmu-raster': ['ras'],
  'image/x-cmx': ['cmx'],
  'image/x-freehand': ['fh', 'fhc', 'fh4', 'fh5', 'fh7'],
  'image/x-icon': ['*ico'],
  'image/x-jng': ['jng'],
  'image/x-mrsid-image': ['sid'],
  'image/x-ms-bmp': ['*bmp'],
  'image/x-pcx': ['*pcx'],
  'image/x-pict': ['pic', 'pct'],
  'image/x-portable-anymap': ['pnm'],
  'image/x-portable-bitmap': ['pbm'],
  'image/x-portable-graymap': ['pgm'],
  'image/x-portable-pixmap': ['ppm'],
  'image/x-rgb': ['rgb'],
  'image/x-tga': ['tga'],
  'image/x-xbitmap': ['xbm'],
  'image/x-xpixmap': ['xpm'],
  'image/x-xwindowdump': ['xwd'],
  'message/vnd.wfa.wsc': ['wsc'],
  'model/vnd.bary': ['bary'],
  'model/vnd.cld': ['cld'],
  'model/vnd.collada+xml': ['dae'],
  'model/vnd.dwf': ['dwf'],
  'model/vnd.gdl': ['gdl'],
  'model/vnd.gtw': ['gtw'],
  'model/vnd.mts': ['*mts'],
  'model/vnd.opengex': ['ogex'],
  'model/vnd.parasolid.transmit.binary': ['x_b'],
  'model/vnd.parasolid.transmit.text': ['x_t'],
  'model/vnd.pytha.pyox': ['pyo', 'pyox'],
  'model/vnd.sap.vds': ['vds'],
  'model/vnd.usda': ['usda'],
  'model/vnd.usdz+zip': ['usdz'],
  'model/vnd.valve.source.compiled-map': ['bsp'],
  'model/vnd.vtu': ['vtu'],
  'text/prs.lines.tag': ['dsc'],
  'text/vnd.curl': ['curl'],
  'text/vnd.curl.dcurl': ['dcurl'],
  'text/vnd.curl.mcurl': ['mcurl'],
  'text/vnd.curl.scurl': ['scurl'],
  'text/vnd.dvb.subtitle': ['sub'],
  'text/vnd.familysearch.gedcom': ['ged'],
  'text/vnd.fly': ['fly'],
  'text/vnd.fmi.flexstor': ['flx'],
  'text/vnd.graphviz': ['gv'],
  'text/vnd.in3d.3dml': ['3dml'],
  'text/vnd.in3d.spot': ['spot'],
  'text/vnd.sun.j2me.app-descriptor': ['jad'],
  'text/vnd.wap.wml': ['wml'],
  'text/vnd.wap.wmlscript': ['wmls'],
  'text/x-asm': ['s', 'asm'],
  'text/x-c': ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic'],
  'text/x-component': ['htc'],
  'text/x-fortran': ['f', 'for', 'f77', 'f90'],
  'text/x-handlebars-template': ['hbs'],
  'text/x-java-source': ['java'],
  'text/x-lua': ['lua'],
  'text/x-markdown': ['mkd'],
  'text/x-nfo': ['nfo'],
  'text/x-opml': ['opml'],
  'text/x-org': ['*org'],
  'text/x-pascal': ['p', 'pas'],
  'text/x-processing': ['pde'],
  'text/x-sass': ['sass'],
  'text/x-scss': ['scss'],
  'text/x-setext': ['etx'],
  'text/x-sfv': ['sfv'],
  'text/x-suse-ymp': ['ymp'],
  'text/x-uuencode': ['uu'],
  'text/x-vcalendar': ['vcs'],
  'text/x-vcard': ['vcf'],
  'video/vnd.dece.hd': ['uvh', 'uvvh'],
  'video/vnd.dece.mobile': ['uvm', 'uvvm'],
  'video/vnd.dece.pd': ['uvp', 'uvvp'],
  'video/vnd.dece.sd': ['uvs', 'uvvs'],
  'video/vnd.dece.video': ['uvv', 'uvvv'],
  'video/vnd.dvb.file': ['dvb'],
  'video/vnd.fvt': ['fvt'],
  'video/vnd.mpegurl': ['mxu', 'm4u'],
  'video/vnd.ms-playready.media.pyv': ['pyv'],
  'video/vnd.uvvu.mp4': ['uvu', 'uvvu'],
  'video/vnd.vivo': ['viv'],
  'video/x-f4v': ['f4v'],
  'video/x-fli': ['fli'],
  'video/x-flv': ['flv'],
  'video/x-m4v': ['m4v'],
  'video/x-matroska': ['mkv', 'mk3d', 'mks'],
  'video/x-mng': ['mng'],
  'video/x-ms-asf': ['asf', 'asx'],
  'video/x-ms-vob': ['vob'],
  'video/x-ms-wm': ['wm'],
  'video/x-ms-wmv': ['wmv'],
  'video/x-ms-wmx': ['wmx'],
  'video/x-ms-wvx': ['wvx'],
  'video/x-msvideo': ['avi'],
  'video/x-sgi-movie': ['movie'],
  'video/x-smv': ['smv'],
  'x-conference/x-cooltalk': ['ice'],
};
Object.freeze(types$1);

const types = {
  'application/andrew-inset': ['ez'],
  'application/appinstaller': ['appinstaller'],
  'application/applixware': ['aw'],
  'application/appx': ['appx'],
  'application/appxbundle': ['appxbundle'],
  'application/atom+xml': ['atom'],
  'application/atomcat+xml': ['atomcat'],
  'application/atomdeleted+xml': ['atomdeleted'],
  'application/atomsvc+xml': ['atomsvc'],
  'application/atsc-dwd+xml': ['dwd'],
  'application/atsc-held+xml': ['held'],
  'application/atsc-rsat+xml': ['rsat'],
  'application/automationml-aml+xml': ['aml'],
  'application/automationml-amlx+zip': ['amlx'],
  'application/bdoc': ['bdoc'],
  'application/calendar+xml': ['xcs'],
  'application/ccxml+xml': ['ccxml'],
  'application/cdfx+xml': ['cdfx'],
  'application/cdmi-capability': ['cdmia'],
  'application/cdmi-container': ['cdmic'],
  'application/cdmi-domain': ['cdmid'],
  'application/cdmi-object': ['cdmio'],
  'application/cdmi-queue': ['cdmiq'],
  'application/cpl+xml': ['cpl'],
  'application/cu-seeme': ['cu'],
  'application/cwl': ['cwl'],
  'application/dash+xml': ['mpd'],
  'application/dash-patch+xml': ['mpp'],
  'application/davmount+xml': ['davmount'],
  'application/dicom': ['dcm'],
  'application/docbook+xml': ['dbk'],
  'application/dssc+der': ['dssc'],
  'application/dssc+xml': ['xdssc'],
  'application/ecmascript': ['ecma'],
  'application/emma+xml': ['emma'],
  'application/emotionml+xml': ['emotionml'],
  'application/epub+zip': ['epub'],
  'application/exi': ['exi'],
  'application/express': ['exp'],
  'application/fdf': ['fdf'],
  'application/fdt+xml': ['fdt'],
  'application/font-tdpfr': ['pfr'],
  'application/geo+json': ['geojson'],
  'application/gml+xml': ['gml'],
  'application/gpx+xml': ['gpx'],
  'application/gxf': ['gxf'],
  'application/gzip': ['gz'],
  'application/hjson': ['hjson'],
  'application/hyperstudio': ['stk'],
  'application/inkml+xml': ['ink', 'inkml'],
  'application/ipfix': ['ipfix'],
  'application/its+xml': ['its'],
  'application/java-archive': ['jar', 'war', 'ear'],
  'application/java-serialized-object': ['ser'],
  'application/java-vm': ['class'],
  'application/javascript': ['*js'],
  'application/json': ['json', 'map'],
  'application/json5': ['json5'],
  'application/jsonml+json': ['jsonml'],
  'application/ld+json': ['jsonld'],
  'application/lgr+xml': ['lgr'],
  'application/lost+xml': ['lostxml'],
  'application/mac-binhex40': ['hqx'],
  'application/mac-compactpro': ['cpt'],
  'application/mads+xml': ['mads'],
  'application/manifest+json': ['webmanifest'],
  'application/marc': ['mrc'],
  'application/marcxml+xml': ['mrcx'],
  'application/mathematica': ['ma', 'nb', 'mb'],
  'application/mathml+xml': ['mathml'],
  'application/mbox': ['mbox'],
  'application/media-policy-dataset+xml': ['mpf'],
  'application/mediaservercontrol+xml': ['mscml'],
  'application/metalink+xml': ['metalink'],
  'application/metalink4+xml': ['meta4'],
  'application/mets+xml': ['mets'],
  'application/mmt-aei+xml': ['maei'],
  'application/mmt-usd+xml': ['musd'],
  'application/mods+xml': ['mods'],
  'application/mp21': ['m21', 'mp21'],
  'application/mp4': ['*mp4', '*mpg4', 'mp4s', 'm4p'],
  'application/msix': ['msix'],
  'application/msixbundle': ['msixbundle'],
  'application/msword': ['doc', 'dot'],
  'application/mxf': ['mxf'],
  'application/n-quads': ['nq'],
  'application/n-triples': ['nt'],
  'application/node': ['cjs'],
  'application/octet-stream': [
    'bin',
    'dms',
    'lrf',
    'mar',
    'so',
    'dist',
    'distz',
    'pkg',
    'bpk',
    'dump',
    'elc',
    'deploy',
    'exe',
    'dll',
    'deb',
    'dmg',
    'iso',
    'img',
    'msi',
    'msp',
    'msm',
    'buffer',
  ],
  'application/oda': ['oda'],
  'application/oebps-package+xml': ['opf'],
  'application/ogg': ['ogx'],
  'application/omdoc+xml': ['omdoc'],
  'application/onenote': ['onetoc', 'onetoc2', 'onetmp', 'onepkg', 'one', 'onea'],
  'application/oxps': ['oxps'],
  'application/p2p-overlay+xml': ['relo'],
  'application/patch-ops-error+xml': ['xer'],
  'application/pdf': ['pdf'],
  'application/pgp-encrypted': ['pgp'],
  'application/pgp-keys': ['asc'],
  'application/pgp-signature': ['sig', '*asc'],
  'application/pics-rules': ['prf'],
  'application/pkcs10': ['p10'],
  'application/pkcs7-mime': ['p7m', 'p7c'],
  'application/pkcs7-signature': ['p7s'],
  'application/pkcs8': ['p8'],
  'application/pkix-attr-cert': ['ac'],
  'application/pkix-cert': ['cer'],
  'application/pkix-crl': ['crl'],
  'application/pkix-pkipath': ['pkipath'],
  'application/pkixcmp': ['pki'],
  'application/pls+xml': ['pls'],
  'application/postscript': ['ai', 'eps', 'ps'],
  'application/provenance+xml': ['provx'],
  'application/pskc+xml': ['pskcxml'],
  'application/raml+yaml': ['raml'],
  'application/rdf+xml': ['rdf', 'owl'],
  'application/reginfo+xml': ['rif'],
  'application/relax-ng-compact-syntax': ['rnc'],
  'application/resource-lists+xml': ['rl'],
  'application/resource-lists-diff+xml': ['rld'],
  'application/rls-services+xml': ['rs'],
  'application/route-apd+xml': ['rapd'],
  'application/route-s-tsid+xml': ['sls'],
  'application/route-usd+xml': ['rusd'],
  'application/rpki-ghostbusters': ['gbr'],
  'application/rpki-manifest': ['mft'],
  'application/rpki-roa': ['roa'],
  'application/rsd+xml': ['rsd'],
  'application/rss+xml': ['rss'],
  'application/rtf': ['rtf'],
  'application/sbml+xml': ['sbml'],
  'application/scvp-cv-request': ['scq'],
  'application/scvp-cv-response': ['scs'],
  'application/scvp-vp-request': ['spq'],
  'application/scvp-vp-response': ['spp'],
  'application/sdp': ['sdp'],
  'application/senml+xml': ['senmlx'],
  'application/sensml+xml': ['sensmlx'],
  'application/set-payment-initiation': ['setpay'],
  'application/set-registration-initiation': ['setreg'],
  'application/shf+xml': ['shf'],
  'application/sieve': ['siv', 'sieve'],
  'application/smil+xml': ['smi', 'smil'],
  'application/sparql-query': ['rq'],
  'application/sparql-results+xml': ['srx'],
  'application/sql': ['sql'],
  'application/srgs': ['gram'],
  'application/srgs+xml': ['grxml'],
  'application/sru+xml': ['sru'],
  'application/ssdl+xml': ['ssdl'],
  'application/ssml+xml': ['ssml'],
  'application/swid+xml': ['swidtag'],
  'application/tei+xml': ['tei', 'teicorpus'],
  'application/thraud+xml': ['tfi'],
  'application/timestamped-data': ['tsd'],
  'application/toml': ['toml'],
  'application/trig': ['trig'],
  'application/ttml+xml': ['ttml'],
  'application/ubjson': ['ubj'],
  'application/urc-ressheet+xml': ['rsheet'],
  'application/urc-targetdesc+xml': ['td'],
  'application/voicexml+xml': ['vxml'],
  'application/wasm': ['wasm'],
  'application/watcherinfo+xml': ['wif'],
  'application/widget': ['wgt'],
  'application/winhlp': ['hlp'],
  'application/wsdl+xml': ['wsdl'],
  'application/wspolicy+xml': ['wspolicy'],
  'application/xaml+xml': ['xaml'],
  'application/xcap-att+xml': ['xav'],
  'application/xcap-caps+xml': ['xca'],
  'application/xcap-diff+xml': ['xdf'],
  'application/xcap-el+xml': ['xel'],
  'application/xcap-ns+xml': ['xns'],
  'application/xenc+xml': ['xenc'],
  'application/xfdf': ['xfdf'],
  'application/xhtml+xml': ['xhtml', 'xht'],
  'application/xliff+xml': ['xlf'],
  'application/xml': ['xml', 'xsl', 'xsd', 'rng'],
  'application/xml-dtd': ['dtd'],
  'application/xop+xml': ['xop'],
  'application/xproc+xml': ['xpl'],
  'application/xslt+xml': ['*xsl', 'xslt'],
  'application/xspf+xml': ['xspf'],
  'application/xv+xml': ['mxml', 'xhvml', 'xvml', 'xvm'],
  'application/yang': ['yang'],
  'application/yin+xml': ['yin'],
  'application/zip': ['zip'],
  'application/zip+dotlottie': ['lottie'],
  'audio/3gpp': ['*3gpp'],
  'audio/aac': ['adts', 'aac'],
  'audio/adpcm': ['adp'],
  'audio/amr': ['amr'],
  'audio/basic': ['au', 'snd'],
  'audio/midi': ['mid', 'midi', 'kar', 'rmi'],
  'audio/mobile-xmf': ['mxmf'],
  'audio/mp3': ['*mp3'],
  'audio/mp4': ['m4a', 'mp4a', 'm4b'],
  'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
  'audio/ogg': ['oga', 'ogg', 'spx', 'opus'],
  'audio/s3m': ['s3m'],
  'audio/silk': ['sil'],
  'audio/wav': ['wav'],
  'audio/wave': ['*wav'],
  'audio/webm': ['weba'],
  'audio/xm': ['xm'],
  'font/collection': ['ttc'],
  'font/otf': ['otf'],
  'font/ttf': ['ttf'],
  'font/woff': ['woff'],
  'font/woff2': ['woff2'],
  'image/aces': ['exr'],
  'image/apng': ['apng'],
  'image/avci': ['avci'],
  'image/avcs': ['avcs'],
  'image/avif': ['avif'],
  'image/bmp': ['bmp', 'dib'],
  'image/cgm': ['cgm'],
  'image/dicom-rle': ['drle'],
  'image/dpx': ['dpx'],
  'image/emf': ['emf'],
  'image/fits': ['fits'],
  'image/g3fax': ['g3'],
  'image/gif': ['gif'],
  'image/heic': ['heic'],
  'image/heic-sequence': ['heics'],
  'image/heif': ['heif'],
  'image/heif-sequence': ['heifs'],
  'image/hej2k': ['hej2'],
  'image/ief': ['ief'],
  'image/jaii': ['jaii'],
  'image/jais': ['jais'],
  'image/jls': ['jls'],
  'image/jp2': ['jp2', 'jpg2'],
  'image/jpeg': ['jpg', 'jpeg', 'jpe'],
  'image/jph': ['jph'],
  'image/jphc': ['jhc'],
  'image/jpm': ['jpm', 'jpgm'],
  'image/jpx': ['jpx', 'jpf'],
  'image/jxl': ['jxl'],
  'image/jxr': ['jxr'],
  'image/jxra': ['jxra'],
  'image/jxrs': ['jxrs'],
  'image/jxs': ['jxs'],
  'image/jxsc': ['jxsc'],
  'image/jxsi': ['jxsi'],
  'image/jxss': ['jxss'],
  'image/ktx': ['ktx'],
  'image/ktx2': ['ktx2'],
  'image/pjpeg': ['jfif'],
  'image/png': ['png'],
  'image/sgi': ['sgi'],
  'image/svg+xml': ['svg', 'svgz'],
  'image/t38': ['t38'],
  'image/tiff': ['tif', 'tiff'],
  'image/tiff-fx': ['tfx'],
  'image/webp': ['webp'],
  'image/wmf': ['wmf'],
  'message/disposition-notification': ['disposition-notification'],
  'message/global': ['u8msg'],
  'message/global-delivery-status': ['u8dsn'],
  'message/global-disposition-notification': ['u8mdn'],
  'message/global-headers': ['u8hdr'],
  'message/rfc822': ['eml', 'mime', 'mht', 'mhtml'],
  'model/3mf': ['3mf'],
  'model/gltf+json': ['gltf'],
  'model/gltf-binary': ['glb'],
  'model/iges': ['igs', 'iges'],
  'model/jt': ['jt'],
  'model/mesh': ['msh', 'mesh', 'silo'],
  'model/mtl': ['mtl'],
  'model/obj': ['obj'],
  'model/prc': ['prc'],
  'model/step': ['step', 'stp', 'stpnc', 'p21', '210'],
  'model/step+xml': ['stpx'],
  'model/step+zip': ['stpz'],
  'model/step-xml+zip': ['stpxz'],
  'model/stl': ['stl'],
  'model/u3d': ['u3d'],
  'model/vrml': ['wrl', 'vrml'],
  'model/x3d+binary': ['*x3db', 'x3dbz'],
  'model/x3d+fastinfoset': ['x3db'],
  'model/x3d+vrml': ['*x3dv', 'x3dvz'],
  'model/x3d+xml': ['x3d', 'x3dz'],
  'model/x3d-vrml': ['x3dv'],
  'text/cache-manifest': ['appcache', 'manifest'],
  'text/calendar': ['ics', 'ifb'],
  'text/coffeescript': ['coffee', 'litcoffee'],
  'text/css': ['css'],
  'text/csv': ['csv'],
  'text/html': ['html', 'htm', 'shtml'],
  'text/jade': ['jade'],
  'text/javascript': ['js', 'mjs'],
  'text/jsx': ['jsx'],
  'text/less': ['less'],
  'text/markdown': ['md', 'markdown'],
  'text/mathml': ['mml'],
  'text/mdx': ['mdx'],
  'text/n3': ['n3'],
  'text/plain': ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
  'text/richtext': ['rtx'],
  'text/rtf': ['*rtf'],
  'text/sgml': ['sgml', 'sgm'],
  'text/shex': ['shex'],
  'text/slim': ['slim', 'slm'],
  'text/spdx': ['spdx'],
  'text/stylus': ['stylus', 'styl'],
  'text/tab-separated-values': ['tsv'],
  'text/troff': ['t', 'tr', 'roff', 'man', 'me', 'ms'],
  'text/turtle': ['ttl'],
  'text/uri-list': ['uri', 'uris', 'urls'],
  'text/vcard': ['vcard'],
  'text/vtt': ['vtt'],
  'text/wgsl': ['wgsl'],
  'text/xml': ['*xml'],
  'text/yaml': ['yaml', 'yml'],
  'video/3gpp': ['3gp', '3gpp'],
  'video/3gpp2': ['3g2'],
  'video/h261': ['h261'],
  'video/h263': ['h263'],
  'video/h264': ['h264'],
  'video/iso.segment': ['m4s'],
  'video/jpeg': ['jpgv'],
  'video/jpm': ['*jpm', '*jpgm'],
  'video/mj2': ['mj2', 'mjp2'],
  'video/mp2t': ['ts', 'm2t', 'm2ts', 'mts'],
  'video/mp4': ['mp4', 'mp4v', 'mpg4'],
  'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
  'video/ogg': ['ogv'],
  'video/quicktime': ['qt', 'mov'],
  'video/webm': ['webm'],
};
Object.freeze(types);

var __classPrivateFieldGet =
  (undefined && undefined.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot read private member from an object whose class did not declare it');
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
var _Mime_extensionToType, _Mime_typeToExtension, _Mime_typeToExtensions;
class Mime {
  constructor(...args) {
    _Mime_extensionToType.set(this, new Map());
    _Mime_typeToExtension.set(this, new Map());
    _Mime_typeToExtensions.set(this, new Map());
    for (const arg of args) {
      this.define(arg);
    }
  }
  define(typeMap, force = false) {
    for (let [type, extensions] of Object.entries(typeMap)) {
      type = type.toLowerCase();
      extensions = extensions.map(ext => ext.toLowerCase());
      if (!__classPrivateFieldGet(this, _Mime_typeToExtensions, 'f').has(type)) {
        __classPrivateFieldGet(this, _Mime_typeToExtensions, 'f').set(type, new Set());
      }
      const allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, 'f').get(type);
      let first = true;
      for (let extension of extensions) {
        const starred = extension.startsWith('*');
        extension = starred ? extension.slice(1) : extension;
        allExtensions?.add(extension);
        if (first) {
          __classPrivateFieldGet(this, _Mime_typeToExtension, 'f').set(type, extension);
        }
        first = false;
        if (starred) continue;
        const currentType = __classPrivateFieldGet(this, _Mime_extensionToType, 'f').get(extension);
        if (currentType && currentType != type && !force) {
          throw new Error(`"${type} -> ${extension}" conflicts with "${currentType} -> ${extension}". Pass \`force=true\` to override this definition.`);
        }
        __classPrivateFieldGet(this, _Mime_extensionToType, 'f').set(extension, type);
      }
    }
    return this;
  }
  getType(path) {
    if (typeof path !== 'string') return null;
    const last = path.replace(/^.*[/\\]/s, '').toLowerCase();
    const ext = last.replace(/^.*\./s, '').toLowerCase();
    const hasPath = last.length < path.length;
    const hasDot = ext.length < last.length - 1;
    if (!hasDot && hasPath) return null;
    return __classPrivateFieldGet(this, _Mime_extensionToType, 'f').get(ext) ?? null;
  }
  getExtension(type) {
    if (typeof type !== 'string') return null;
    type = type?.split?.(';')[0];
    return (type && __classPrivateFieldGet(this, _Mime_typeToExtension, 'f').get(type.trim().toLowerCase())) ?? null;
  }
  getAllExtensions(type) {
    if (typeof type !== 'string') return null;
    return __classPrivateFieldGet(this, _Mime_typeToExtensions, 'f').get(type.toLowerCase()) ?? null;
  }
  _freeze() {
    this.define = () => {
      throw new Error('define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances');
    };
    Object.freeze(this);
    for (const extensions of __classPrivateFieldGet(this, _Mime_typeToExtensions, 'f').values()) {
      Object.freeze(extensions);
    }
    return this;
  }
  _getTestState() {
    return {
      types: __classPrivateFieldGet(this, _Mime_extensionToType, 'f'),
      extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, 'f'),
    };
  }
}
((_Mime_extensionToType = new WeakMap()), (_Mime_typeToExtension = new WeakMap()), (_Mime_typeToExtensions = new WeakMap()));

var mime = new Mime(types, types$1)._freeze();

/**
 * filesize
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 10.1.6
 */
const ARRAY = 'array';
const BIT = 'bit';
const BITS = 'bits';
const BYTE = 'byte';
const BYTES = 'bytes';
const EMPTY = '';
const EXPONENT = 'exponent';
const FUNCTION = 'function';
const IEC = 'iec';
const INVALID_NUMBER = 'Invalid number';
const INVALID_ROUND = 'Invalid rounding method';
const JEDEC = 'jedec';
const OBJECT = 'object';
const PERIOD = '.';
const ROUND = 'round';
const S = 's';
const SI = 'si';
const SI_KBIT = 'kbit';
const SI_KBYTE = 'kB';
const SPACE = ' ';
const STRING = 'string';
const ZERO = '0';
const STRINGS = {
  symbol: {
    iec: {
      bits: ['bit', 'Kibit', 'Mibit', 'Gibit', 'Tibit', 'Pibit', 'Eibit', 'Zibit', 'Yibit'],
      bytes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
    },
    jedec: {
      bits: ['bit', 'Kbit', 'Mbit', 'Gbit', 'Tbit', 'Pbit', 'Ebit', 'Zbit', 'Ybit'],
      bytes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    },
  },
  fullform: {
    iec: ['', 'kibi', 'mebi', 'gibi', 'tebi', 'pebi', 'exbi', 'zebi', 'yobi'],
    jedec: ['', 'kilo', 'mega', 'giga', 'tera', 'peta', 'exa', 'zetta', 'yotta'],
  },
};
function filesize(
  arg,
  {
    bits = false,
    pad = false,
    base = -1,
    round = 2,
    locale = EMPTY,
    localeOptions = {},
    separator = EMPTY,
    spacer = SPACE,
    symbols = {},
    standard = EMPTY,
    output = STRING,
    fullform = false,
    fullforms = [],
    exponent = -1,
    roundingMethod = ROUND,
    precision = 0,
  } = {},
) {
  let e = exponent,
    num = Number(arg),
    result = [],
    val = 0,
    u = EMPTY;

  // Sync base & standard
  if (standard === SI) {
    base = 10;
    standard = JEDEC;
  } else if (standard === IEC || standard === JEDEC) {
    base = 2;
  } else if (base === 2) {
    standard = IEC;
  } else {
    base = 10;
    standard = JEDEC;
  }

  const ceil = base === 10 ? 1000 : 1024,
    full = fullform === true,
    neg = num < 0,
    roundingFunc = Math[roundingMethod];

  if (typeof arg !== 'bigint' && isNaN(arg)) {
    throw new TypeError(INVALID_NUMBER);
  }

  if (typeof roundingFunc !== FUNCTION) {
    throw new TypeError(INVALID_ROUND);
  }

  // Flipping a negative number to determine the size
  if (neg) {
    num = -num;
  }

  // Determining the exponent
  if (e === -1 || isNaN(e)) {
    e = Math.floor(Math.log(num) / Math.log(ceil));

    if (e < 0) {
      e = 0;
    }
  }

  // Exceeding supported length, time to reduce & multiply
  if (e > 8) {
    if (precision > 0) {
      precision += 8 - e;
    }

    e = 8;
  }

  if (output === EXPONENT) {
    return e;
  }

  // Zero is now a special case because bytes divide by 1
  if (num === 0) {
    result[0] = 0;
    u = result[1] = STRINGS.symbol[standard][bits ? BITS : BYTES][e];
  } else {
    val = num / (base === 2 ? Math.pow(2, e * 10) : Math.pow(1000, e));

    if (bits) {
      val = val * 8;

      if (val >= ceil && e < 8) {
        val = val / ceil;
        e++;
      }
    }

    const p = Math.pow(10, e > 0 ? round : 0);
    result[0] = roundingFunc(val * p) / p;

    if (result[0] === ceil && e < 8 && exponent === -1) {
      result[0] = 1;
      e++;
    }

    u = result[1] = base === 10 && e === 1 ? (bits ? SI_KBIT : SI_KBYTE) : STRINGS.symbol[standard][bits ? BITS : BYTES][e];
  }

  // Decorating a 'diff'
  if (neg) {
    result[0] = -result[0];
  }

  // Setting optional precision
  if (precision > 0) {
    result[0] = result[0].toPrecision(precision);
  }

  // Applying custom symbol
  result[1] = symbols[result[1]] || result[1];

  if (locale === true) {
    result[0] = result[0].toLocaleString();
  } else if (locale.length > 0) {
    result[0] = result[0].toLocaleString(locale, localeOptions);
  } else if (separator.length > 0) {
    result[0] = result[0].toString().replace(PERIOD, separator);
  }

  if (pad && round > 0) {
    const i = result[0].toString(),
      x = separator || (i.match(/(\D)/g) || []).pop() || PERIOD,
      tmp = i.toString().split(x),
      s = tmp[1] || EMPTY,
      l = s.length,
      n = round - l;

    result[0] = `${tmp[0]}${x}${s.padEnd(l + n, ZERO)}`;
  }

  if (full) {
    result[1] = fullforms[e] ? fullforms[e] : STRINGS.fullform[standard][e] + (bits ? BIT : BYTE) + (result[0] === 1 ? EMPTY : S);
  }

  // Returning Array, Object, or String (default)
  return output === ARRAY
    ? result
    : output === OBJECT
      ? {
          value: result[0],
          symbol: result[1],
          exponent: e,
          unit: u,
        }
      : result.join(spacer);
}

const tkUploadCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-upload-container{display:flex;flex-direction:column;gap:8px}.tk-upload-container .label{font-size:var(--desktop-label-m-base-size);line-height:var(--desktop-label-m-base-line-height);padding:var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding);color:var(--text-darkest);font-weight:400}.tk-upload-container .label .asterisk{color:var(--states-danger-base);font-size:var(--desktop-label-s-size);font-weight:300;line-height:var(--desktop-label-s-line-height)}.tk-upload-container .hint{color:var(--text-base);line-height:var(--desktop-label-s-line-height);font-size:var(--desktop-label-s-size);font-weight:300;display:flex;align-items:center;gap:var(--spacing-m-base)}.tk-upload-container .hint i{font-size:var(--size-base);width:var(--size-base);height:var(--size-base);color:var(--icon-base)}.tk-upload-container[aria-invalid] .tk-upload-dropzone{border-color:var(--states-danger-base)}.tk-upload-container[aria-invalid] .hint,.tk-upload-container[aria-invalid] .hint i{color:var(--states-danger-base)}.tk-upload-container .tk-upload-dropzone{padding:12px;border-radius:8px;border:1px dashed var(--border-sub-base);gap:16px}.tk-upload-container .tk-upload-dropzone.default{display:flex}.tk-upload-container .tk-upload-dropzone.default .tk-upload-icon .icon i{font-size:40px;color:var(--primary-base)}.tk-upload-container .tk-upload-dropzone.default .tk-upload-content{display:flex;flex-direction:column;gap:8px}.tk-upload-container .tk-upload-dropzone.default .tk-upload-content .tk-upload-text-holder .tk-upload-title{color:var(--text-darkest, #222530);font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size, 14px);font-weight:400;line-height:var(--desktop-body-s-line-height, 20px);}.tk-upload-container .tk-upload-dropzone.default .tk-upload-content .tk-upload-text-holder .tk-upload-description{color:var(--text-base, #717784);font-family:var(--desktop-body-xs-font, Geologica);font-size:var(--desktop-body-xs-size, 12px);font-style:normal;font-weight:300;line-height:var(--desktop-body-xs-line-height, 18px);}.tk-upload-container .tk-upload-dropzone.default .tk-upload-content .tk-upload-input{display:flex;gap:8px}.tk-upload-container .tk-upload-dropzone.default .tk-upload-icon .icon i{font-size:40px;color:var(--primary-base)}.tk-upload-container .tk-upload-dropzone.centered{flex-direction:column;align-items:center}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-icon{text-align:center}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-icon .icon{justify-content:center}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-icon .icon i{font-size:40px;color:var(--primary-base);padding:8px}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-content{display:flex;flex-direction:column;align-items:center;gap:8px}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-content .tk-upload-text-holder{display:contents;gap:8px}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-content .tk-upload-text-holder .tk-upload-title{color:var(--text-darkest, #222530);font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size, 14px);font-weight:400;line-height:var(--desktop-body-s-line-height, 20px);}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-content .tk-upload-text-holder .tk-upload-description{color:var(--text-base, #717784);font-family:var(--desktop-body-xs-font, Geologica);font-size:var(--desktop-body-xs-size, 12px);font-style:normal;font-weight:300;line-height:var(--desktop-body-xs-line-height, 18px);}.tk-upload-container .tk-upload-dropzone.centered .tk-upload-content .tk-upload-input{display:flex;gap:8px;padding:8px}.tk-upload-container .tk-upload-dropzone.drag-over{border-color:var(--primary-color);background-color:rgba(var(--primary-color-rgb), 0.05)}.tk-upload-container .tk-upload-dropzone.drag-over .tk-upload-icon{color:var(--primary-color)}.tk-upload-container .tk-upload-dropzone.disabled{opacity:0.6;cursor:not-allowed}.tk-upload-container .tk-upload-file-holder{display:flex;flex-direction:column;gap:8px;max-height:500px;overflow-y:auto}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item{display:flex;gap:8px;padding:12px;border-radius:8px;border:1px solid var(--border-sub-base);background:var(--static-light)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview{width:50px;height:50px;position:relative}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview svg{width:50px;height:50px}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text{position:absolute;left:0;bottom:10px;min-width:36px;font-size:12px;padding:4px 0;background-color:var(--secondary-500);border-radius:8px;color:var(--static-light);text-align:center}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.pdf{background-color:var(--primary-base)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.jpg{background-color:var(--states-warning-base)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.png{background-color:var(--states-warning-dark)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.mp4{background-color:var(--states-info-base)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.xls,.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.xlsx,.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.cvs{background-color:var(--states-success-darkest)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.doc,.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.docx{background-color:var(--states-info-dark)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.txt{background-color:var(--states-verified-base)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.zip,.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview .extension-text.rar{background-color:var(--secondary-500)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-preview img{border-radius:8px}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content{display:flex;justify-content:space-between;flex-grow:1}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content .tk-upload-file-name{color:var(--text-darkest);font-size:var(--desktop-body-s-size);line-height:var(--desktop-body-s-line-height);word-break:break-word}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content .tk-upload-file-size-state{display:flex;gap:8px;color:var(--text-base);font-size:var(--desktop-label-s-size, 12px);font-weight:300;margin-top:6px}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content .tk-upload-file-size-state .tk-upload-state{display:flex;align-items:center;gap:4px}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content .tk-upload-file-size-state .tk-upload-state .icon{font-size:16px;width:16px;height:16px}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content .tk-upload-file-size-state .tk-upload-state.added .icon{color:var(--states-success-base)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content .tk-upload-file-size-state .tk-upload-state.failed .icon{color:var(--states-danger-base)}.tk-upload-container .tk-upload-file-holder .tk-upload-file-item .tk-upload-file-content .tk-upload-file-buttons{display:flex;gap:4px}.tk-upload-container .tk-upload-file-holder::-webkit-scrollbar{width:6px;background:var(--background-lightest);opacity:1}.tk-upload-container .tk-upload-file-holder::-webkit-scrollbar-track{border-radius:2px;background:var(--background-lightest);opacity:1}.tk-upload-container .tk-upload-file-holder::-webkit-scrollbar-thumb{border-radius:3px;background:var(--secondary-sub-base);opacity:1}.tk-upload-container.drag-drop-enabled .tk-upload-dropzone{transition:all 0.2s ease}.tk-upload-container.drag-drop-enabled .tk-upload-dropzone:hover:not(.disabled){border-color:var(--primary-color)}';

const TkUpload$1 = /*@__PURE__*/ proxyCustomElement(
  class TkUpload extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.tkFilesRejected = createEvent(this, 'tk-files-rejected', 7);
      this.tkUpload = createEvent(this, 'tk-upload', 7);
      this.tkRemovedFile = createEvent(this, 'tk-removed-file', 7);
      this.tkDownloadFile = createEvent(this, 'tk-download-file', 7);
      this.errorMessages = [];
      this.isDragOver = false;
      /**
       * If `autoUpload` is set to `true`, the upload button will be hidden,
       * and the `tkUpload` event will be automatically triggered for each newly added file.
       */
      this.autoUpload = false;
      /**
       * Enables drag and drop functionality for file uploads.
       * @defaultValue true
       */
      this.dragDrop = true;
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * Displays the uploaded files.
       * @defaultValue true
       */
      this.showFiles = true;
      /**
       * Label text displayed inside the choose button.
       */
      this.chooseButtonLabel = 'Choose File';
      /**
       * Label text displayed inside the upload button.
       */
      this.uploadButtonLabel = 'Upload';
      /**
       * Acceptable file types for upload. Use MIME types or extensions separated by commas.
       */
      this.accept = '*';
      /**
       * Disables the input, preventing user interaction.
       */
      this.disabled = false;
      /**
       * Allows multiple file selection.
       */
      this.multiple = false;
      /**
       * Title displayed in the upload component.
       */
      this.title = 'Choose a file or drag & drop it here.';
      /**
       * Title displayed in the upload component when drag and drop is active.
       */
      this.dragDropTitle = 'Drop files here';
      /**
       * The file value of the upload.
       */
      this.value = [];
      /**
       * Description displayed under the title.
       */
      this.description = 'JPEG, PNG, PDF and MP4 formats, up to 50 MB.';
      /**
       * Description displayed under the title when drag and drop is active.
       */
      this.dragDropDescription = 'Release to upload files';
      /**
       * Indicates whether the upload is in an invalid state, uploads will fail eventually
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * Indicates whether the upload is in an loading state
       * @defaultValue false
       */
      this.loading = false;
      /**
       * Type of the file upload area.
       */
      this.type = 'default';
      /**
       * Indicates whether the files can be downloaded. When true, a download button will be displayed next to each file.
       */
      this.downloadable = false;
      this.handleDragEnter = e => {
        if (!this.dragDrop || this.disabled) return;
        e.preventDefault();
        e.stopPropagation();
        this.isDragOver = true;
      };
      this.handleDragLeave = e => {
        if (!this.dragDrop || this.disabled) return;
        e.preventDefault();
        e.stopPropagation();
        // Only set isDragOver to false if we're leaving the dropzone entirely
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          this.isDragOver = false;
        }
      };
      this.handleDragOver = e => {
        if (!this.dragDrop || this.disabled) return;
        e.preventDefault();
        e.stopPropagation();
        this.isDragOver = true;
      };
      this.handleDrop = e => {
        var _a;
        if (!this.dragDrop || this.disabled) return;
        e.preventDefault();
        e.stopPropagation();
        this.isDragOver = false;
        const files = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
        if (files && files.length > 0) {
          this.handleProcessFiles(files);
        }
      };
    }
    valueChanged(newValue) {
      if (!newValue || (newValue === null || newValue === void 0 ? void 0 : newValue.length) <= 0) this.inputRef.value = null;
    }
    isImageFile(file) {
      const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      return IMAGE_TYPES.includes(file.type);
    }
    handleProcessFiles(files) {
      const rejectedFiles = [];
      const isFileCountRejected = this.maxFileCount && this.value.length + files.length > this.maxFileCount;
      // Validate file count
      if (isFileCountRejected) {
        rejectedFiles.push({
          reason: `Max file count exceeded, max ${this.maxFileCount} files allowed.`,
          file: files,
        });
      } else {
        Array.from(files).forEach(file => {
          // Validate file size
          if (file.size > this.maxFileSize) {
            rejectedFiles.push({
              reason: `File size exceeds the maximum allowed size of ${this.maxFileSize / (1024 * 1024)} MB.`,
              file,
            });
            return;
          }
          // Validate file type
          if (this.accept !== '*' && !this.accept.includes(file.type)) {
            rejectedFiles.push({
              reason: `Invalid file type. Accepted types are: ${this.accept}.`,
              file,
            });
            return;
          }
          // If valid, add to accepted files
          if (this.multiple) this.value.push(file);
          else this.value = [file];
        });
      }
      // Update state and emit events
      this.errorMessages = rejectedFiles.map(item => (item.file instanceof File ? `${item.file.name}: ${item.reason}` : item.reason));
      if (!isFileCountRejected && this.value.length > 0) {
        this.tkChange.emit(this.value);
        if (this.autoUpload) this.handleUploadButtonClick();
      }
      if (rejectedFiles.length > 0) {
        this.tkFilesRejected.emit(rejectedFiles);
      }
    }
    handleInputChange(e) {
      const input = e.target;
      const files = input.files;
      if (files && files.length > 0) {
        this.handleProcessFiles(files);
      }
    }
    handleDownloadButtonClick(file) {
      this.tkDownloadFile.emit(file);
    }
    handleRemoveButtonClick(file) {
      const removeIndex = this.value.findIndex(item => file.lastModified == item.lastModified && file.name == item.name);
      const removedFile = this.value.splice(removeIndex, 1);
      this.value = [...this.value];
      this.inputRef.value = null;
      this.tkChange.emit(this.value);
      this.tkRemovedFile.emit(removedFile[0]);
    }
    handleUploadButtonClick() {
      this.tkUpload.emit(this.value);
    }
    renderFilePreview(file) {
      if (this.isImageFile(file)) {
        return h('img', { src: URL.createObjectURL(file), width: 50, height: 50 });
      } else {
        let ext = mime.getExtension(file.type);
        if (!ext) {
          const tmpArr = file.name.split('.');
          ext = tmpArr[tmpArr.length - 1];
        }
        return h(
          Fragment,
          null,
          h(
            'svg',
            { width: '32', height: '32', viewBox: '0 0 32 32', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
            h('path', { 'd': 'M23 1V7.66667C23 8.40333 23.5967 9 24.3333 9H31', 'stroke': '#CACFD8', 'stroke-width': '1.5' }),
            h('path', {
              'd': 'M21.5147 0.75C22.9071 0.75 24.2425 1.30312 25.227 2.28769L29.7123 6.77297C30.6969 7.75754 31.25 9.09289 31.25 10.4853V26C31.25 28.8995 28.8995 31.25 26 31.25H12C9.1005 31.25 6.75 28.8995 6.75 26V6C6.75 3.10051 9.10051 0.75 12 0.75H21.5147Z',
              'stroke': '#CACFD8',
              'stroke-width': '1.5',
            }),
          ),
          h('div', { class: classNames('extension-text', ext) }, ext === null || ext === void 0 ? void 0 : ext.toUpperCase()),
        );
      }
    }
    renderState() {
      let iconName = 'check_circle';
      let state = 'added';
      if (this.loading) {
        state = 'loading';
        iconName = 'progress_activity';
      } else if (this.invalid) {
        state = 'failed';
        iconName = 'dangerous';
      }
      return h(
        'label',
        { class: classNames('tk-upload-state', state) },
        state == 'loading'
          ? h('tk-spinner', { type: 'three-dots', size: 'xsmall' })
          : h('tk-icon', Object.assign({}, getIconElementProps(iconName, { class: 'fill' }, undefined, 'span'))),
        state,
      );
    }
    renderDropzone() {
      var _a;
      const dropzoneClasses = classNames('tk-upload-dropzone', this.type, {
        'drag-over': this.isDragOver,
        'disabled': this.disabled,
      });
      const dropzoneProps =
        this.dragDrop && !this.disabled
          ? {
              onDragEnter: this.handleDragEnter,
              onDragLeave: this.handleDragLeave,
              onDragOver: this.handleDragOver,
              onDrop: this.handleDrop,
            }
          : {};
      return h(
        'div',
        Object.assign({ class: dropzoneClasses }, dropzoneProps),
        h('div', { class: 'tk-upload-icon' }, h('tk-icon', Object.assign({}, getIconElementProps('file_upload', { class: 'icon', size: 'xlarge' }, undefined, 'span')))),
        h(
          'div',
          { class: 'tk-upload-content' },
          h(
            'div',
            { class: 'tk-upload-text-holder' },
            h('div', { class: 'tk-upload-title' }, this.isDragOver ? this.dragDropTitle : this.title),
            h('div', { class: 'tk-upload-description' }, this.isDragOver ? this.dragDropDescription : this.description),
          ),
          h(
            'div',
            { class: 'tk-upload-input' },
            h('tk-button', {
              'label': this.chooseButtonLabel,
              'variant': 'neutral',
              'type': 'outlined',
              'icon': 'folder',
              'disabled': this.disabled,
              'onTk-click': () => this.inputRef.click(),
            }),
            !this.autoUpload &&
              h('tk-button', {
                'label': this.uploadButtonLabel,
                'variant': 'neutral',
                'type': 'outlined',
                'icon': 'file_upload',
                'loading': this.loading,
                'disabled': !(((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0) || this.loading,
                'onTk-click': this.handleUploadButtonClick.bind(this),
              }),
            h('input', {
              ref: el => (this.inputRef = el),
              type: 'file',
              accept: this.accept,
              multiple: this.multiple ? true : undefined,
              onChange: e => this.handleInputChange(e),
              style: { display: 'none' },
            }),
          ),
        ),
      );
    }
    renderFileholder() {
      var _a;
      return h(
        'div',
        { class: 'tk-upload-file-holder' },
        (_a = this.value) === null || _a === void 0
          ? void 0
          : _a.map((item, index) =>
              h(
                'div',
                { class: 'tk-upload-file-item', key: index },
                h('div', { class: 'tk-upload-file-preview' }, this.renderFilePreview(item)),
                h(
                  'div',
                  { class: 'tk-upload-file-content' },
                  h(
                    'div',
                    null,
                    h('div', { class: 'tk-upload-file-name' }, item.name),
                    h('div', { class: 'tk-upload-file-size-state' }, h('span', { class: 'tk-upload-size' }, filesize(item.size, { standard: 'jedec' })), this.renderState()),
                  ),
                  h(
                    'div',
                    { class: 'tk-upload-file-buttons' },
                    this.downloadable &&
                      h('tk-button', {
                        'variant': 'neutral',
                        'type': 'outlined',
                        'icon': 'file_download',
                        'size': 'small',
                        'onTk-click': () => this.handleDownloadButtonClick(item),
                      }),
                    h('tk-button', { 'variant': 'neutral', 'type': 'outlined', 'icon': 'close', 'size': 'small', 'onTk-click': () => this.handleRemoveButtonClick(item) }),
                  ),
                ),
              ),
            ),
      );
    }
    render() {
      var _a, _b, _c;
      let label;
      let hint;
      const rootClasses = classNames('tk-upload-container', {
        'drag-drop-enabled': this.dragDrop,
      });
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const asterisk = h('span', { key: '665cd4809cccf732d775b80a757fb02621856a46', class: 'asterisk' }, '*');
        label = h('label', { key: '48d72296339295212bb5a6872b5b067dc33ef26a', class: 'label' }, this.label, this.showAsterisk ? asterisk : '');
      }
      if (((_b = this.hint) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        hint = h(
          'span',
          { key: '04b7389f902864211990e1bb91b0ccc4ca116414', class: 'hint' },
          h('i', { key: '45b5eef98cb84f0d537c3ebebb7128cf03fad2ef', class: 'material-symbols-outlined' }, 'info'),
          this.hint,
        );
      }
      if (((_c = this.error) === null || _c === void 0 ? void 0 : _c.length) > 0) {
        hint = h(
          'span',
          { key: 'e9c2bf2ae6bf7af0bd14ee2bd56af7226f226d34', class: 'hint' },
          h('i', { key: 'a8f8e8687ef1c7e1d5a2e3941f07cded4827dcd3', class: 'material-symbols-outlined' }, 'info'),
          this.error,
        );
      }
      return h(
        'div',
        { 'key': 'f67736791fc7d8bbc9b38730192adc4129ba533a', 'class': rootClasses, 'aria-disabled': this.disabled, 'aria-invalid': this.invalid },
        label,
        this.renderDropzone(),
        hint,
        this.showFiles && this.renderFileholder(),
      );
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkUploadCss;
    }
  },
  [
    0,
    'tk-upload',
    {
      autoUpload: [4, 'auto-upload'],
      dragDrop: [4, 'drag-drop'],
      label: [1],
      hint: [1],
      error: [1],
      showAsterisk: [4, 'show-asterisk'],
      showFiles: [4, 'show-files'],
      chooseButtonLabel: [1, 'choose-button-label'],
      uploadButtonLabel: [1, 'upload-button-label'],
      accept: [1],
      disabled: [4],
      multiple: [4],
      maxFileCount: [2, 'max-file-count'],
      maxFileSize: [2, 'max-file-size'],
      title: [1],
      dragDropTitle: [1, 'drag-drop-title'],
      value: [1040],
      description: [1],
      dragDropDescription: [1, 'drag-drop-description'],
      invalid: [4],
      loading: [4],
      type: [1],
      downloadable: [4],
      errorMessages: [32],
      isDragOver: [32],
    },
    undefined,
    {
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-upload', 'tk-button', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-upload':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkUpload$1);
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkUpload = TkUpload$1;
const defineCustomElement = defineCustomElement$1;

export { TkUpload, defineCustomElement };
//# sourceMappingURL=tk-upload.js.map

//# sourceMappingURL=tk-upload.js.map
