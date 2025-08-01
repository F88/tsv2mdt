const sample1: string = [
  'Name\tAge\tJob title',
  'Alice\t30\tEngineer',
  'Bob\t25\tDesigner',
  'Charlie\t35\tManager',
].join('\n');

const sample4: string = [
  "Year\tWinner's avg speed\tTotal distance (km)\tNumber of stages",
  '1903\t25.68\t2,428.00\t6',
  '1910\t29.1\t4,737.00\t15',
  '1920\t24.07\t5,503.00\t15',
  '1930\t28\t4,822.00\t21',
  '1950\t32.78\t4,773.00\t22',
  '1960\t37.21\t4,173.00\t22',
  '1970\t35.59\t4,254.00\t23',
  '1980\t35.14\t3,946.00\t22',
  '1990\t38.26\t3,504.00\t21',
  '2000\t39.56\t3,662.00\t21',
  '2010\t39.59\t3,641.90\t20',
].join('\n');

const sample2: string = [
  'No\tName\tType\tTotal\tHP\tAttack\tDefense\tSp. Atk\tSp. Def\tSpeed',
  '1\tBulbasaur\tGrass,Poison\t318\t45\t49\t49\t65\t65\t45',
  '2\tIvysaur\tGrass,Poison\t405\t60\t62\t63\t80\t80\t60',
  '3\tVenusaur\tGrass,Poison\t525\t80\t82\t83\t100\t100\t80',
  '4\tCharmander\tFire\t309\t39\t52\t43\t60\t50\t65',
  '5\tCharmeleon\tFire\t405\t58\t64\t58\t80\t65\t80',
  '6\tCharizard\tFire,Flying\t534\t78\t84\t78\t109\t85\t100',
  '7\tSquirtle\tWater\t314\t44\t48\t65\t50\t64\t43',
  '8\tWartortle\tWater\t405\t59\t63\t80\t65\t80\t58',
  '9\tBlastoise\tWater\t530\t79\t83\t100\t85\t105\t78',
  '10\tCaterpie\tBug\t195\t45\t30\t35\t20\t20\t45',
  '11\tMetapod\tBug\t205\t50\t20\t55\t25\t25\t30',
  '12\tButterfree\tBug,Flying\t395\t60\t45\t50\t90\t80\t70',
  '13\tWeedle\tBug,Poison\t195\t40\t35\t30\t20\t20\t50',
  '14\tKakuna\tBug,Poison\t205\t45\t25\t50\t25\t25\t35',
  '15\tBeedrill\tBug,Poison\t395\t65\t90\t40\t45\t80\t75',
  '16\tPidgey\tNormal,Flying\t251\t40\t45\t40\t35\t35\t56',
  '17\tPidgeotto\tNormal,Flying\t349\t63\t60\t55\t50\t50\t71',
  '18\tPidgeot\tNormal,Flying\t479\t83\t80\t75\t70\t70\t101',
  '19\tRattata\tNormal\t253\t30\t56\t35\t25\t35\t72',
  '20\tRaticate\tNormal\t413\t55\t81\t60\t50\t70\t97',
  '21\tSpearow\tNormal,Flying\t262\t40\t60\t30\t31\t31\t70',
  '22\tFearow\tNormal,Flying\t442\t65\t90\t65\t61\t61\t100',
  '23\tEkans\tPoison\t288\t35\t60\t44\t40\t54\t55',
  '24\tArbok\tPoison\t448\t60\t95\t69\t65\t79\t80',
  '25\tPikachu\tElectric\t320\t35\t55\t40\t50\t50\t90',
  '26\tRaichu\tElectric\t485\t60\t90\t55\t90\t80\t110',
  '27\tSandshrew\tGround\t300\t50\t75\t85\t20\t30\t40',
  '28\tSandslash\tGround\t450\t75\t100\t110\t45\t55\t65',
  '29\tNidoran♀\tPoison\t275\t55\t47\t52\t40\t40\t41',
  '30\tNidorina\tPoison\t365\t70\t62\t67\t55\t55\t56',
  '31\tNidoqueen\tPoison,Ground\t505\t90\t92\t87\t75\t85\t76',
  '32\tNidoran♂\tPoison\t273\t46\t57\t40\t40\t40\t50',
  '33\tNidorino\tPoison\t365\t61\t72\t57\t55\t55\t65',
  '34\tNidoking\tPoison,Ground\t505\t81\t102\t77\t85\t75\t85',
  '35\tClefairy\tFairy\t323\t70\t45\t48\t60\t65\t35',
  '36\tClefable\tFairy\t483\t95\t70\t73\t95\t90\t60',
  '37\tVulpix\tFire\t299\t38\t41\t40\t50\t65\t65',
  '38\tNinetales\tFire\t505\t73\t76\t75\t81\t100\t100',
  '39\tJigglypuff\tNormal,Fairy\t270\t115\t45\t20\t45\t25\t20',
  '40\tWigglytuff\tNormal,Fairy\t435\t140\t70\t45\t85\t50\t45',
  '41\tZubat\tPoison,Flying\t245\t40\t45\t35\t30\t40\t55',
  '42\tGolbat\tPoison,Flying\t455\t75\t80\t70\t65\t75\t90',
  '43\tOddish\tGrass,Poison\t320\t45\t50\t55\t75\t65\t30',
  '44\tGloom\tGrass,Poison\t395\t60\t65\t70\t85\t75\t40',
  '45\tVileplume\tGrass,Poison\t490\t75\t80\t85\t110\t90\t50',
  '46\tParas\tBug,Grass\t285\t35\t70\t55\t45\t55\t25',
  '47\tParasect\tBug,Grass\t405\t60\t95\t80\t60\t80\t30',
  '48\tVenonat\tBug,Poison\t305\t60\t55\t50\t40\t55\t45',
  '49\tVenomoth\tBug,Poison\t450\t70\t65\t60\t90\t75\t90',
  '50\tDiglett\tGround\t265\t10\t55\t25\t35\t45\t95',
  '51\tDugtrio\tGround\t425\t35\t100\t50\t50\t70\t120',
  '52\tMeowth\tNormal\t290\t40\t45\t35\t40\t40\t90',
  '53\tPersian\tNormal\t440\t65\t70\t60\t65\t65\t115',
  '54\tPsyduck\tWater\t320\t50\t52\t48\t65\t50\t55',
  '55\tGolduck\tWater\t500\t80\t82\t78\t95\t80\t85',
  '56\tMankey\tFighting\t305\t40\t80\t35\t35\t45\t70',
  '57\tPrimeape\tFighting\t455\t65\t105\t60\t60\t70\t95',
  '58\tGrowlithe\tFire\t350\t55\t70\t45\t70\t50\t60',
  '59\tArcanine\tFire\t555\t90\t110\t80\t100\t80\t95',
  '60\tPoliwag\tWater\t300\t40\t50\t40\t40\t40\t90',
  '61\tPoliwhirl\tWater\t385\t65\t65\t65\t50\t50\t90',
  '62\tPoliwrath\tWater,Fighting\t510\t90\t95\t95\t70\t90\t70',
  '63\tAbra\tPsychic\t310\t25\t20\t15\t105\t55\t90',
  '64\tKadabra\tPsychic\t400\t40\t35\t30\t120\t70\t105',
  '65\tAlakazam\tPsychic\t500\t55\t50\t45\t135\t95\t120',
  '66\tMachop\tFighting\t305\t70\t80\t50\t35\t35\t35',
  '67\tMachoke\tFighting\t405\t80\t100\t70\t50\t60\t45',
  '68\tMachamp\tFighting\t505\t90\t130\t80\t65\t85\t55',
  '69\tBellsprout\tGrass,Poison\t300\t50\t75\t35\t70\t30\t40',
  '70\tWeepinbell\tGrass,Poison\t390\t65\t90\t50\t85\t45\t55',
  '71\tVictreebel\tGrass,Poison\t490\t80\t105\t65\t100\t70\t70',
  '72\tTentacool\tWater,Poison\t335\t40\t40\t35\t50\t100\t70',
  '73\tTentacruel\tWater,Poison\t515\t80\t70\t65\t80\t120\t100',
  '74\tGeodude\tRock,Ground\t300\t40\t80\t100\t30\t30\t20',
  '75\tGraveler\tRock,Ground\t390\t55\t95\t115\t45\t45\t35',
  '76\tGolem\tRock,Ground\t495\t80\t120\t130\t55\t65\t45',
  '77\tPonyta\tFire\t410\t50\t85\t55\t65\t65\t90',
  '78\tRapidash\tFire\t500\t65\t100\t70\t80\t80\t105',
  '79\tSlowpoke\tWater,Psychic\t315\t90\t65\t65\t40\t40\t15',
  '80\tSlowbro\tWater,Psychic\t490\t95\t75\t110\t100\t80\t30',
  '81\tMagnemite\tElectric,Steel\t325\t25\t35\t70\t95\t55\t45',
  '82\tMagneton\tElectric,Steel\t465\t50\t60\t95\t120\t70\t70',
  "83\tFarfetch'd\tNormal, Flying\t377\t52\t90\t55\t58\t62\t60",
  '84\tDoduo\tNormal,Flying\t310\t35\t85\t45\t35\t35\t75',
  '85\tDodrio\tNormal,Flying\t470\t60\t110\t70\t60\t60\t110',
  '86\tSeel\tWater\t325\t65\t45\t55\t45\t70\t45',
  '87\tDewgong\tWater,Ice\t475\t90\t70\t80\t70\t95\t70',
  '88\tGrimer\tPoison\t325\t80\t80\t50\t40\t50\t25',
  '89\tMuk\tPoison\t500\t105\t105\t75\t65\t100\t50',
  '90\tShellder\tWater\t305\t30\t65\t100\t45\t25\t40',
  '91\tCloyster\tWater,Ice\t525\t50\t95\t180\t85\t45\t70',
  '92\tGastly\tGhost,Poison\t310\t30\t35\t30\t100\t35\t80',
  '93\tHaunter\tGhost,Poison\t405\t45\t50\t45\t115\t55\t95',
  '94\tGengar\tGhost,Poison\t500\t60\t65\t60\t130\t75\t110',
  '95\tOnix\tRock,Ground\t385\t35\t45\t160\t30\t45\t70',
  '96\tDrowzee\tPsychic\t328\t60\t48\t45\t43\t90\t42',
  '97\tHypno\tPsychic\t483\t85\t73\t70\t73\t115\t67',
  '98\tKrabby\tWater\t325\t30\t105\t90\t25\t25\t50',
  '99\tKingler\tWater\t475\t55\t130\t115\t50\t50\t75',
  '100\tVoltorb\tElectric\t330\t40\t30\t50\t55\t55\t100',
  '101\tElectrode\tElectric\t490\t60\t50\t70\t80\t80\t150',
  '102\tExeggcute\tGrass,Psychic\t325\t60\t40\t80\t60\t45\t40',
  '103\tExeggutor\tGrass,Psychic\t530\t95\t95\t85\t125\t75\t55',
  '104\tCubone\tGround\t320\t50\t50\t95\t40\t50\t35',
  '105\tMarowak\tGround\t425\t60\t80\t110\t50\t80\t45',
  '106\tHitmonlee\tFighting\t455\t50\t120\t53\t35\t110\t87',
  '107\tHitmonchan\tFighting\t455\t50\t105\t79\t35\t110\t76',
  '108\tLickitung\tNormal\t385\t90\t55\t75\t60\t75\t30',
  '109\tKoffing\tPoison\t340\t40\t65\t95\t60\t45\t35',
  '110\tWeezing\tPoison\t490\t65\t90\t120\t85\t70\t60',
  '111\tRhyhorn\tGround,Rock\t345\t80\t85\t95\t30\t30\t25',
  '112\tRhydon\tGround,Rock\t485\t105\t130\t120\t45\t45\t40',
  '113\tChansey\tNormal\t450\t250\t5\t5\t35\t105\t50',
  '114\tTangela\tGrass\t435\t65\t55\t115\t100\t40\t60',
  '115\tKangaskhan\tNormal\t490\t105\t95\t80\t40\t80\t90',
  '116\tHorsea\tWater\t295\t30\t40\t70\t70\t25\t60',
  '117\tSeadra\tWater\t440\t55\t65\t95\t95\t45\t85',
  '118\tGoldeen\tWater\t320\t45\t67\t60\t35\t50\t63',
  '119\tSeaking\tWater\t450\t80\t92\t65\t65\t80\t68',
  '120\tStaryu\tWater\t340\t30\t45\t55\t70\t55\t85',
  '121\tStarmie\tWater,Psychic\t520\t60\t75\t85\t100\t85\t115',
  '122\tMr. Mime\tPsychic,Fairy\t460\t40\t45\t65\t100\t120\t90',
  '123\tScyther\tBug,Flying\t500\t70\t110\t80\t55\t80\t105',
  '124\tJynx\tIce,Psychic\t455\t65\t50\t35\t115\t95\t95',
  '125\tElectabuzz\tElectric\t490\t65\t83\t57\t95\t85\t105',
  '126\tMagmar\tFire\t495\t65\t95\t57\t100\t85\t93',
  '127\tPinsir\tBug\t500\t65\t125\t100\t55\t70\t85',
  '128\tTauros\tNormal\t490\t75\t100\t95\t40\t70\t110',
  '129\tMagikarp\tWater\t200\t20\t10\t55\t15\t20\t80',
  '130\tGyarados\tWater,Flying\t540\t95\t125\t79\t60\t100\t81',
  '131\tLapras\tWater,Ice\t535\t130\t85\t80\t85\t95\t60',
  '132\tDitto\tNormal\t288\t48\t48\t48\t48\t48\t48',
  '133\tEevee\tNormal\t325\t55\t55\t50\t45\t65\t55',
  '134\tVaporeon\tWater\t525\t130\t65\t60\t110\t95\t65',
  '135\tJolteon\tElectric\t525\t65\t65\t60\t110\t95\t130',
  '136\tFlareon\tFire\t525\t65\t130\t60\t95\t110\t65',
  '137\tPorygon\tNormal\t395\t65\t60\t70\t85\t75\t40',
  '138\tOmanyte\tRock,Water\t355\t35\t40\t100\t90\t55\t35',
  '139\tOmastar\tRock,Water\t495\t70\t60\t125\t115\t70\t55',
  '140\tKabuto\tRock,Water\t355\t30\t80\t90\t55\t45\t55',
  '141\tKabutops\tRock,Water\t495\t60\t115\t105\t65\t70\t80',
  '142\tAerodactyl\tRock,Flying\t515\t80\t105\t65\t60\t75\t130',
  '143\tSnorlax\tNormal\t540\t160\t110\t65\t65\t110\t30',
  '144\tArticuno\tIce,Flying\t580\t90\t85\t100\t95\t125\t85',
  '145\tZapdos\tElectric,Flying\t580\t90\t90\t85\t125\t90\t100',
  '146\tMoltres\tFire,Flying\t580\t90\t100\t90\t125\t85\t90',
  '147\tDratini\tDragon\t300\t41\t64\t45\t50\t50\t50',
  '148\tDragonair\tDragon\t420\t61\t84\t65\t70\t70\t70',
  '149\tDragonite\tDragon,Flying\t600\t91\t134\t95\t100\t100\t80',
  '150\tMewtwo\tPsychic\t680\t106\t110\t90\t154\t90\t130',
  '151\tMew\tPsychic\t600\t100\t100\t100\t100\t100\t100',
].join('\n');

const sample3: string = [
  '作品名\t制作年',
  'TIGER & BUNNY\t2011年',
  '劇場版 TIGER & BUNNY The Rising\t2014年',
  '魔法少女まどか☆マギカ\t2011年',
  'ラブライブ!(TVアニメ1期)\t2013年',
  'ラブライブ!(TVアニメ2期)\t2014年',
  '劇場版 TIGER & BUNNY The Beginning\t2012年',
  'コードギアス 反逆のルルーシュ\t2006年',
  'カードキャプターさくら\t1998年',
  'ラブライブ!The School Idol Movie\t2015年',
  'おそ松さん\t2015年',
  '銀魂\t2006年',
  'ジョーカー・ゲーム\t2016年',
  '銀河英雄伝説\t1988年',
  '新世紀エヴァンゲリオン\t1995年',
  'コードギアス 反逆のルルーシュR2\t2008年',
  'ご注文はうさぎですか?\t2014年',
  '機動戦士ガンダム\t1979年',
  'デジモンアドベンチャー\t1999年',
  'PSYCHO-PASS サイコパス\t2012年',
  'ソードアート・オンライン\t2012年',
  'CLANNAD〜AFTER STORY〜\t2008年',
  'ガールズ&パンツァー\t2012年',
  'ハイキュー!!\t2014年',
  '名探偵コナン\t1996年',
  '氷菓\t2012年',
  '劇場版 魔法少女まどか☆マギカ [新編]叛逆の物語\t2013年',
  '鋼の錬金術師 FULLMETAL ALCHEMIST\t2009年',
  '進撃の巨人\t2013年',
  '宇宙戦艦ヤマト\t1974年',
  '少女革命ウテナ\t1997年',
  '文豪ストレイドッグス\t2016年',
  'テニスの王子様\t2001年',
  'ラブライブ!サンシャイン!!\t2016年',
  'カウボーイビバップ\t1998年',
  'STEINS;GATE\t2011年',
  '夏目友人帳\t2008年',
  'Fate/stay night [Unlimited Blade Works]\t2014年',
  '星の子ポロン\t1974年',
  '未来少年コナン\t1978年',
  '機動戦士ガンダムSEED\t2002年',
  'けいおん!\t2009年',
  '涼宮ハルヒの憂鬱（第1期）\t2006年',
  '天元突破グレンラガン\t2007年',
  'ルパン三世 カリオストロの城\t1979年',
  '化物語\t2009年',
  '攻殻機動隊 STAND ALONE COMPLEX\t2002年',
  '響け!ユーフォニアム\t2015年',
  'Free!\t2013年',
  'ガールズ&パンツァー 劇場版\t2015年',
  'Fate/Zero\t2011年',
  '四月は君の嘘\t2014年',
  'SHIROBAKO\t2014年',
  '劇場版ポケットモンスター ダイヤモンド&パール ギラティナと氷空の花束 シェイミ\t2008年',
  '風の谷のナウシカ\t1984年',
  "銀魂'\t2011年",
  'うたの☆プリンスさまっ♪マジLOVE1000%\t2011年',
  '君の名は。\t2016年',
  'けいおん!!\t2010年',
  '天空の城ラピュタ\t1986年',
  '美少女戦士セーラームーン\t1992年',
  'Re:ゼロから始める異世界生活\t2016年',
  'Free! -Eternal Summer-\t2014年',
  'ハイ☆スピード! -Free! Starting Days-\t2015年',
  '家庭教師ヒットマンREBORN!\t2006年',
  '幽☆遊☆白書\t1992年',
  'THE IDOLM@STER\t2011年',
  'ハイキュー!!セカンドシーズン\t2015年',
  'ご注文はうさぎですか??\t2015年',
  'モブサイコ100\t2016年',
  '機動戦士ガンダム 鉄血のオルフェンズ\t2015年',
  '鋼の錬金術師\t2003年',
  'ONE PIECE\t1999年',
  'マクロスF\t2008年',
  '少年ハリウッド\t2014年',
  'さらば宇宙戦艦ヤマト 愛の戦士たち\t1978年',
  'カードキャプターさくら(第2期)\t1999年',
  'Angel Beats!\t2010年',
  '蟲師\t2005年',
  'うる星やつら\t1981年',
  '昭和元禄落語心中\t2016年',
  'K\t2012年',
  '黒子のバスケ(第1期)\t2012年',
  'あの日見た花の名前を僕達はまだ知らない。\t2011年',
  'HUNTER×HUNTER\t1999年',
  'ポケットモンスター\t1997年',
  '装甲騎兵ボトムズ\t1983年',
  '十二国記\t2002年',
  '血界戦線\t2015年',
  'ヘタリア The Beautiful World\t2013年',
  'ふしぎの海のナディア\t1990年',
  'モノノ怪\t2007年',
  'キルラキル KILL la KILL\t2013年',
  '犬夜叉\t2000年',
  'うる星やつら2 ビューティフル・ドリーマー\t1984年',
  '電脳コイル\t2007年',
  'ジョジョの奇妙な冒険 スターダストクルセイダース\t2014年',
  'AKIRA\t1988年',
  '超時空要塞マクロス 愛・おぼえていますか\t1984年',
  'ガンとゴン\t1974年',
  '四畳半神話大系\t2010年',
].join('\n');

export const ExampleData: string[] = [sample1, sample2, sample3, sample4];
