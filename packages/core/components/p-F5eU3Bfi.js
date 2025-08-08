const globalStyles =
  '@import url("https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap");@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:root{--primary-50:#fae6e8;--primary-100:#eeb0b8;--primary-200:#e68a95;--primary-300:#db5465;--primary-400:#d43347;--primary-500:#c90019;--primary-600:#b70017;--primary-700:#8f0012;--primary-800:#6f000e;--primary-900:#54000b;--static-black:#000000;--static-white:#ffffff;--secondary-50:#f2f3f5;--secondary-100:#dadee3;--secondary-200:#c1c8d1;--secondary-300:#a9b3be;--secondary-400:#919dac;--secondary-500:#79889a;--secondary-600:#607083;--secondary-700:#49586a;--secondary-800:#34404f;--neutral-0:#ffffff;--secondary-900:#1f2833;--neutral-50:#f9fafc;--neutral-100:#f2f5f8;--neutral-200:#e1e4ea;--neutral-300:#cacfd8;--neutral-400:#99a0ae;--neutral-500:#717784;--neutral-600:#525866;--neutral-700:#2b303b;--neutral-800:#222530;--neutral-900:#181b25;--neutral-1000:#111216;--red-50:#fff5f5;--red-100:#ffd0ce;--red-200:#ffaca7;--red-300:#ff8780;--red-400:#ff6259;--red-500:#ff3d32;--red-600:#d9342b;--red-700:#b32b23;--red-800:#8c221c;--red-900:#661814;--blue-50:#f5f9ff;--blue-100:#d0e1fd;--blue-200:#abc9fb;--blue-300:#85b2f9;--blue-400:#609af8;--blue-500:#3b82f6;--blue-600:#326fd1;--blue-700:#295bac;--blue-800:#204887;--blue-900:#183462;--green-50:#f4fcf7;--green-100:#caf1d8;--green-200:#a0e6ba;--green-300:#76db9b;--green-400:#4cd07d;--green-500:#22c55e;--green-600:#1da750;--green-700:#188a42;--green-800:#136c34;--green-900:#0e4f26;--yellow-50:#fefbf3;--yellow-100:#faedc4;--yellow-200:#f6de95;--yellow-300:#f2d066;--yellow-400:#eec137;--yellow-500:#eab308;--yellow-600:#c79807;--yellow-700:#a47d06;--yellow-800:#816204;--yellow-900:#5e4803;--purple-50:#fbf7ff;--purple-100:#ead6fd;--purple-200:#dab6fc;--purple-300:#c996fa;--purple-400:#b975f9;--purple-500:#a855f7;--purple-600:#8f48d2;--purple-700:#763cad;--purple-800:#5c2f88;--purple-900:#432263;--cyan-50:#f3fbfd;--cyan-100:#c3edf5;--cyan-200:#94e0ed;--cyan-300:#65d2e4;--cyan-400:#35c4dc;--cyan-500:#06b6d4;--cyan-600:#059bb4;--cyan-700:#047f94;--cyan-800:#036475;--cyan-900:#024955;--business-50:#fdf0e9;--business-100:#f7d5c4;--business-200:#edbba3;--business-300:#e0a385;--business-400:#cf8c6b;--business-500:#ba7655;--business-600:#a45e3c;--business-700:#894727;--business-800:#6a3216;--business-900:#4e3224;--teal-50:#f3fbfb;--teal-100:#c7eeea;--teal-200:#9ae0d9;--teal-300:#6dd3c8;--teal-400:#41c5b7;--teal-500:#14b8a6;--teal-600:#119c8d;--teal-700:#0e8174;--teal-800:#0b655b;--teal-900:#084a42;--alpha-brand-primary-500-24:#c900193d;--alpha-brand-primary-500-16:#c9001928;--alpha-brand-primary-500-8:#c9001914;--alpha-brand-secondary-500-24:#79889a3d;--alpha-brand-secondary-500-16:#79889a28;--alpha-brand-secondary-500-8:#79889a14;--alpha-base-black-72:#000000b7;--alpha-base-black-64:#000000a3;--alpha-base-black-48:#0000007a;--alpha-base-black-32:#00000051;--alpha-base-black-24:#0000003d;--alpha-base-black-16:#00000028;--alpha-base-black-12:#0000001e;--alpha-base-black-8:#00000014;--alpha-base-black-4:#0000000a;--alpha-base-black-2:#00000005;--alpha-base-black-none:#00000000;--alpha-base-white-72:#ffffffb7;--alpha-base-white-64:#ffffffa3;--alpha-base-white-48:#ffffff7a;--alpha-base-white-32:#ffffff51;--alpha-base-white-24:#ffffff3d;--alpha-base-white-16:#ffffff28;--alpha-base-white-12:#ffffff1e;--alpha-base-white-8:#ffffff14;--alpha-base-white-4:#ffffff0a;--alpha-base-white-2:#ffffff05;--alpha-base-white-none:#ffffff00;--alpha-blue-blue-500-72:#3b82f6b7;--alpha-blue-blue-500-64:#3b82f6a3;--alpha-blue-blue-500-48:#3b82f67a;--alpha-blue-blue-500-32:#3b82f651;--alpha-blue-blue-500-24:#3b82f63d;--alpha-blue-blue-500-16:#3b82f628;--alpha-blue-blue-500-12:#3b82f61e;--alpha-blue-blue-500-8:#3b82f614;--alpha-blue-blue-500-4:#3b82f60a;--alpha-blue-blue-500-2:#3b82f605;--alpha-neutral-neutral-500-72:#525866b7;--alpha-neutral-neutral-500-64:#525866a3;--alpha-neutral-neutral-500-48:#5258667a;--alpha-neutral-neutral-500-32:#52586651;--alpha-neutral-neutral-500-24:#5258663d;--alpha-neutral-neutral-500-16:#52586628;--alpha-neutral-neutral-500-12:#5258661e;--alpha-neutral-neutral-500-8:#52586614;--alpha-neutral-neutral-500-4:#5258660a;--alpha-neutral-neutral-500-2:#52586605;--aviation-amber-50:#fff2e5;--aviation-amber-100:#ffd9b2;--aviation-amber-200:#ffcc99;--aviation-amber-300:#ffb366;--aviation-amber-400:#ff9933;--aviation-amber-500:#ff8000;--aviation-amber-600:#cc6600;--aviation-amber-700:#994d00;--aviation-amber-800:#663300;--aviation-amber-900:#4d2600;--family-title:"Geologica";--family-label:"Geologica";--family-body:"Geologica";--family-subheading:"Geologica";--size-xxs:11px;--size-xs:12px;--size-sm:14px;--size-base:16px;--size-lg:18px;--size-xl:20px;--size-2xl:24px;--size-3xl:30px;--size-4xl:36px;--size-5xl:48px;--size-6xl:60px;--size-7xl:72px;--size-8xl:96px;--size-9xl:128px;--weight-light:200;--weight-regular:300;--weight-medium:400;--weight-semibold:500;--weight-bold:600;--weight-extrabold:700;--weight-black:800;--line-height-xxs-none:11px;--line-height-xxs-tight:14px;--line-height-xxs-normal:16px;--line-height-xs-none:12px;--line-height-xs-tight:15px;--line-height-xs-normal:18px;--line-height-sm-none:14px;--line-height-sm-tight:17.5px;--line-height-sm-normal:20px;--line-height-base-none:16px;--line-height-base-tight:20px;--line-height-base-normal:24px;--line-height-lg-none:18px;--line-height-lg-tight:22.5px;--line-height-lg-normal:27px;--line-height-xl-none:20px;--line-height-xl-tight:25px;--line-height-xl-normal:30px;--line-height-2xl-none:24px;--line-height-2xl-tight:30px;--line-height-2xl-normal:36px;--line-height-3xl-none:30px;--line-height-3xl-tight:37.5px;--line-height-3xl-normal:45px;--line-height-4xl-none:36px;--line-height-4xl-tight:45px;--line-height-4xl-normal:54px;--line-height-5xl-none:48px;--line-height-5xl-tight:60px;--line-height-5xl-normal:72px;--line-height-6xl-none:60px;--line-height-6xl-tight:75px;--line-height-6xl-normal:90px;--line-height-7xl-none:72px;--line-height-7xl-tight:90px;--line-height-7xl-normal:108px;--line-height-8xl-none:96px;--line-height-8xl-tight:120px;--line-height-8xl-normal:144px;--line-height-9xl-none:128px;--line-height-9xl-tight:128px;--line-height-9xl-normal:128px;--desktop-title-display1-font:var(--family-title);--desktop-title-display1-size:var(--size-8xl);--desktop-title-display1-line-weight:var(--weight-medium);--desktop-title-display1-line-height:var(--line-height-8xl-none);--desktop-title-display2-font:var(--family-title);--desktop-title-display2-size:var(--size-7xl);--desktop-title-display2-line-weight:var(--weight-medium);--desktop-title-display2-line-height:var(--line-height-7xl-none);--desktop-title-h1-font:var(--family-title);--desktop-title-h1-size:var(--size-6xl);--desktop-title-h1-line-weight:var(--weight-medium);--desktop-title-h1-line-height:var(--line-height-6xl-none);--desktop-title-h2-font:var(--family-title);--desktop-title-h2-size:var(--size-5xl);--desktop-title-h2-line-weight:var(--weight-medium);--desktop-title-h2-line-height:var(--line-height-5xl-none);--desktop-title-h3-font:var(--family-title);--desktop-title-h3-size:var(--size-4xl);--desktop-title-h3-line-weight:var(--weight-bold);--desktop-title-h3-line-height:var(--line-height-4xl-none);--desktop-title-h4-font:var(--family-title);--desktop-title-h4-size:var(--size-3xl);--desktop-title-h4-line-weight:var(--weight-bold);--desktop-title-h4-line-height:var(--line-height-3xl-tight);--desktop-title-h5-font:var(--family-title);--desktop-title-h5-size:var(--size-2xl);--desktop-title-h5-line-weight:var(--weight-bold);--desktop-title-h5-line-height:var(--line-height-2xl-tight);--desktop-body-2xl-font:var(--family-body);--desktop-body-2xl-size:var(--size-2xl);--desktop-body-2xl-line-weight:var(--weight-medium);--desktop-body-2xl-line-height:var(--line-height-2xl-normal);--desktop-body-xl-font:var(--family-body);--desktop-body-xl-size:var(--size-xl);--desktop-body-xl-line-weight:var(--weight-medium);--desktop-body-xl-line-height:var(--line-height-xl-normal);--desktop-body-l-font:var(--family-body);--desktop-body-l-size:var(--size-lg);--desktop-body-l-line-weight:var(--weight-medium);--desktop-body-l-line-height:var(--line-height-lg-normal);--desktop-body-m-base-font:var(--family-body);--desktop-body-m-base-size:var(--size-base);--desktop-body-m-base-line-weight:var(--weight-medium);--desktop-body-m-base-line-height:var(--line-height-base-normal);--desktop-subheading-m-base-font:var(--family-body);--desktop-subheading-m-base-size:var(--size-base);--desktop-subheading-m-base-line-weight:var(--weight-medium);--desktop-subheading-m-base-line-height:var(--line-height-base-normal);--desktop-subheading-s-font:var(--family-body);--desktop-subheading-s-size:var(--size-sm);--desktop-subheading-s-line-weight:var(--weight-medium);--desktop-subheading-s-line-height:var(--line-height-sm-normal);--desktop-subheading-xs-font:var(--family-body);--desktop-subheading-xs-size:var(--size-xs);--desktop-subheading-xs-line-weight:var(--weight-medium);--desktop-subheading-xs-line-height:var(--line-height-xs-normal);--desktop-subheading-2xs-font:var(--family-body);--desktop-subheading-2xs-size:var(--size-xxs);--desktop-subheading-2xs-line-weight:var(--weight-medium);--desktop-subheading-2xs-line-height:var(--line-height-xxs-normal);--desktop-label-l-font:var(--family-body);--desktop-label-m-base-font:var(--family-body);--desktop-label-m-base-size:var(--size-sm);--desktop-label-m-base-line-weight:var(--weight-medium);--desktop-label-m-base-line-height:var(--line-height-sm-normal);--desktop-label-l-size:var(--size-base);--desktop-label-l-line-weight:var(--weight-medium);--desktop-label-l-line-height:var(--line-height-base-normal);--desktop-label-s-font:var(--family-body);--desktop-label-s-size:var(--size-xs);--desktop-label-s-line-weight:var(--weight-medium);--desktop-label-s-line-height:var(--line-height-xs-normal);--desktop-label-underline-s-font:var(--family-body);--desktop-label-underline-s-size:var(--size-xs);--desktop-label-underline-s-line-weight:var(--weight-medium);--desktop-label-underline-s-line-height:var(--line-height-xs-normal);--desktop-body-s-font:var(--family-body);--desktop-body-s-size:var(--size-sm);--desktop-body-s-line-weight:var(--weight-medium);--desktop-body-s-line-height:var(--line-height-sm-normal);--desktop-body-xs-font:var(--family-body);--desktop-body-xs-size:var(--size-xs);--desktop-body-xs-line-weight:var(--weight-medium);--desktop-body-xs-line-height:var(--line-height-xs-normal);--desktop-title-h6-font:var(--family-title);--desktop-title-h6-size:var(--size-xl);--desktop-title-h6-line-weight:var(--weight-bold);--desktop-title-h6-line-height:var(--line-height-xl-tight);--desktop-label-underline-m-base-font:var(--family-body);--desktop-label-underline-m-base-size:var(--size-sm);--desktop-label-underline-m-base-line-weight:var(--weight-medium);--desktop-label-underline-m-base-line-height:var(--line-height-sm-normal);--desktop-label-underline-l-font:var(--family-body);--desktop-label-underline-l-size:var(--size-base);--desktop-label-underline-l-line-weight:var(--weight-medium);--desktop-label-underline-l-line-height:var(--line-height-base-normal);--desktop-body-2xs-font:var(--family-body);--desktop-body-2xs-size:var(--size-xxs);--desktop-body-2xs-line-weight:var(--weight-medium);--desktop-body-2xs-line-height:var(--line-height-xxs-normal);--tablet-title-display1-font:var(--family-title);--tablet-title-display1-size:var(--size-7xl);--tablet-title-display1-line-weight:var(--weight-medium);--tablet-title-display1-line-height:var(--line-height-7xl-none);--tablet-title-display2-font:var(--family-title);--tablet-title-display2-size:var(--size-6xl);--tablet-title-display2-line-weight:var(--weight-medium);--tablet-title-display2-line-height:var(--line-height-6xl-none);--tablet-title-h1-font:var(--family-title);--tablet-title-h1-size:var(--size-5xl);--tablet-title-h1-line-weight:var(--weight-medium);--tablet-title-h1-line-height:var(--line-height-5xl-none);--tablet-title-h2-font:var(--family-title);--tablet-title-h2-size:var(--size-4xl);--tablet-title-h2-line-weight:var(--weight-medium);--tablet-title-h2-line-height:var(--line-height-4xl-none);--tablet-title-h3-font:var(--family-title);--tablet-title-h3-size:var(--size-3xl);--tablet-title-h3-line-weight:var(--weight-bold);--tablet-title-h3-line-height:var(--line-height-3xl-none);--tablet-title-h4-font:var(--family-title);--tablet-title-h4-size:var(--size-2xl);--tablet-title-h4-line-weight:var(--weight-bold);--tablet-title-h4-line-height:var(--line-height-2xl-tight);--tablet-title-h5-font:var(--family-title);--tablet-title-h5-size:var(--size-xl);--tablet-title-h5-line-weight:var(--weight-bold);--tablet-title-h5-line-height:var(--line-height-xl-tight);--tablet-body-2xl-font:var(--family-body);--tablet-body-2xl-size:var(--size-xl);--tablet-body-2xl-line-weight:var(--weight-medium);--tablet-body-2xl-line-height:var(--line-height-xl-normal);--tablet-body-xl-font:var(--family-body);--tablet-body-xl-size:var(--size-lg);--tablet-body-xl-line-weight:var(--weight-medium);--tablet-body-xl-line-height:var(--line-height-lg-normal);--tablet-body-l-font:var(--family-body);--tablet-body-l-size:var(--size-base);--tablet-body-l-line-weight:var(--weight-medium);--tablet-body-l-line-height:var(--line-height-base-normal);--tablet-body-m-base-font:var(--family-body);--tablet-body-m-base-size:var(--size-sm);--tablet-body-m-base-line-weight:var(--weight-medium);--tablet-body-m-base-line-height:var(--line-height-sm-normal);--tablet-subheading-m-base-font:var(--family-body);--tablet-subheading-m-base-size:var(--size-base);--tablet-subheading-m-base-line-weight:var(--weight-medium);--tablet-subheading-m-base-line-height:var(--line-height-base-normal);--tablet-subheading-s-font:var(--family-body);--tablet-subheading-s-size:var(--size-sm);--tablet-subheading-s-line-weight:var(--weight-medium);--tablet-subheading-s-line-height:var(--line-height-sm-normal);--tablet-subheading-xs-font:var(--family-body);--tablet-subheading-xs-size:var(--size-xs);--tablet-subheading-xs-line-weight:var(--weight-medium);--tablet-subheading-xs-line-height:var(--line-height-xs-normal);--tablet-subheading-2xs-font:var(--family-body);--tablet-subheading-2xs-size:var(--size-xxs);--tablet-subheading-2xs-line-weight:var(--weight-medium);--tablet-subheading-2xs-line-height:var(--line-height-xxs-normal);--tablet-label-l-font:var(--family-body);--tablet-label-m-base-font:var(--family-body);--tablet-label-m-base-size:var(--size-sm);--tablet-label-m-base-line-weight:var(--weight-medium);--tablet-label-m-base-line-height:var(--line-height-sm-normal);--tablet-label-l-size:var(--size-sm);--tablet-label-l-line-weight:var(--weight-medium);--tablet-label-l-line-height:var(--line-height-sm-normal);--tablet-label-s-font:var(--family-body);--tablet-label-s-size:var(--size-xs);--tablet-label-s-line-weight:var(--weight-medium);--tablet-label-s-line-height:var(--line-height-xs-normal);--tablet-label-underline-s-font:var(--family-body);--tablet-label-underline-s-size:var(--size-xs);--tablet-label-underline-s-line-weight:var(--weight-medium);--tablet-label-underline-s-line-height:var(--line-height-xs-normal);--tablet-body-s-font:var(--family-body);--tablet-body-s-size:var(--size-xs);--tablet-body-s-line-weight:var(--weight-medium);--tablet-body-s-line-height:var(--line-height-xs-normal);--tablet-body-xs-font:var(--family-body);--tablet-body-xs-size:var(--size-xs);--tablet-body-xs-line-weight:var(--weight-medium);--tablet-body-xs-line-height:var(--line-height-xs-normal);--tablet-title-h6-font:var(--family-title);--tablet-title-h6-size:var(--size-lg);--tablet-title-h6-line-weight:var(--weight-bold);--tablet-title-h6-line-height:var(--line-height-lg-tight);--tablet-label-underline-m-base-font:var(--family-body);--tablet-label-underline-m-base-size:var(--size-xs);--tablet-label-underline-m-base-line-weight:var(--weight-medium);--tablet-label-underline-m-base-line-height:var(--line-height-xs-normal);--tablet-label-underline-l-font:var(--family-body);--tablet-label-underline-l-size:var(--size-sm);--tablet-label-underline-l-line-weight:var(--weight-medium);--tablet-label-underline-l-line-height:var(--line-height-sm-normal);--tablet-body-2xs-font:var(--family-body);--tablet-body-2xs-size:var(--size-xxs);--tablet-body-2xs-line-weight:var(--weight-medium);--tablet-body-2xs-line-height:var(--line-height-xxs-normal);--mobile-title-display1-font:var(--family-title);--mobile-title-display1-size:var(--size-6xl);--mobile-title-display1-line-weight:var(--weight-medium);--mobile-title-display1-line-height:var(--line-height-6xl-none);--mobile-title-display2-font:var(--family-title);--mobile-title-display2-size:var(--size-5xl);--mobile-title-display2-line-weight:var(--weight-medium);--mobile-title-display2-line-height:var(--line-height-5xl-none);--mobile-title-h1-font:var(--family-title);--mobile-title-h1-size:var(--size-4xl);--mobile-title-h1-line-weight:var(--weight-medium);--mobile-title-h1-line-height:var(--line-height-5xl-none);--mobile-title-h2-font:var(--family-title);--mobile-title-h2-size:var(--size-3xl);--mobile-title-h2-line-weight:var(--weight-medium);--mobile-title-h2-line-height:var(--line-height-3xl-none);--mobile-title-h3-font:var(--family-title);--mobile-title-h3-size:var(--size-2xl);--mobile-title-h3-line-weight:var(--weight-bold);--mobile-title-h3-line-height:var(--line-height-2xl-none);--mobile-title-h4-font:var(--family-title);--mobile-title-h4-size:var(--size-xl);--mobile-title-h4-line-weight:var(--weight-bold);--mobile-title-h4-line-height:var(--line-height-xl-tight);--mobile-title-h5-font:var(--family-title);--mobile-title-h5-size:var(--size-lg);--mobile-title-h5-line-weight:var(--weight-bold);--mobile-title-h5-line-height:var(--line-height-lg-tight);--mobile-body-2xl-font:var(--family-body);--mobile-body-2xl-size:var(--size-lg);--mobile-body-2xl-line-weight:var(--weight-medium);--mobile-body-2xl-line-height:var(--line-height-lg-normal);--mobile-body-xl-font:var(--family-body);--mobile-body-xl-size:var(--size-base);--mobile-body-xl-line-weight:var(--weight-medium);--mobile-body-xl-line-height:var(--line-height-base-normal);--mobile-body-l-font:var(--family-body);--mobile-body-l-size:var(--size-sm);--mobile-body-l-line-weight:var(--weight-medium);--mobile-body-l-line-height:var(--line-height-sm-normal);--mobile-body-m-base-font:var(--family-body);--mobile-body-m-base-size:var(--size-xs);--mobile-body-m-base-line-weight:var(--weight-medium);--mobile-body-m-base-line-height:var(--line-height-sm-normal);--mobile-subheading-m-base-font:var(--family-body);--mobile-subheading-m-base-size:var(--size-xs);--mobile-subheading-m-base-line-weight:var(--weight-medium);--mobile-subheading-m-base-line-height:var(--line-height-xs-normal);--mobile-subheading-s-font:var(--family-body);--mobile-subheading-s-size:var(--size-xs);--mobile-subheading-s-line-weight:var(--weight-medium);--mobile-subheading-s-line-height:var(--line-height-xs-normal);--mobile-subheading-xs-font:var(--family-body);--mobile-subheading-xs-size:var(--size-xs);--mobile-subheading-xs-line-weight:var(--weight-medium);--mobile-subheading-xs-line-height:var(--line-height-xs-normal);--mobile-subheading-2xs-font:var(--family-body);--mobile-subheading-2xs-size:var(--size-xxs);--mobile-subheading-2xs-line-weight:var(--weight-medium);--mobile-subheading-2xs-line-height:var(--line-height-xxs-normal);--mobile-label-l-font:var(--family-body);--mobile-label-m-base-font:var(--family-body);--mobile-label-m-base-size:var(--size-xs);--mobile-label-m-base-line-weight:var(--weight-medium);--mobile-label-m-base-line-height:var(--line-height-xs-normal);--mobile-label-l-size:var(--size-xs);--mobile-label-l-line-weight:var(--weight-medium);--mobile-label-l-line-height:var(--line-height-xs-normal);--mobile-label-s-font:var(--family-body);--mobile-label-s-size:var(--size-xxs);--mobile-label-s-line-weight:var(--weight-medium);--mobile-label-s-line-height:var(--line-height-xxs-normal);--mobile-label-underline-s-font:var(--family-body);--mobile-label-underline-s-size:var(--size-xxs);--mobile-label-underline-s-line-weight:var(--weight-medium);--mobile-label-underline-s-line-height:var(--line-height-xxs-normal);--mobile-body-s-font:var(--family-body);--mobile-body-s-size:var(--size-xs);--mobile-body-s-line-weight:var(--weight-medium);--mobile-body-s-line-height:var(--line-height-xs-normal);--mobile-body-xs-font:var(--family-body);--mobile-body-xs-size:var(--size-xs);--mobile-body-xs-line-weight:var(--weight-medium);--mobile-body-xs-line-height:var(--line-height-xs-normal);--mobile-title-h6-font:var(--family-title);--mobile-title-h6-size:var(--size-base);--mobile-title-h6-line-weight:var(--weight-bold);--mobile-title-h6-line-height:var(--line-height-base-tight);--mobile-label-underline-m-base-font:var(--family-body);--mobile-label-underline-m-base-size:var(--size-xxs);--mobile-label-underline-m-base-line-weight:var(--weight-medium);--mobile-label-underline-m-base-line-height:var(--line-height-xxs-normal);--mobile-label-underline-l-font:var(--family-body);--mobile-label-underline-l-size:var(--size-xs);--mobile-label-underline-l-line-weight:var(--weight-medium);--mobile-label-underline-l-line-height:var(--line-height-xs-normal);--mobile-body-2xs-font:var(--family-body);--mobile-body-2xs-size:var(--size-xxs);--mobile-body-2xs-line-weight:var(--weight-medium);--mobile-body-2xs-line-height:var(--line-height-xxs-normal);--effect-1-default-xl:0px 2px 2px -1px var(--shadow-black-alpha-darkest), 0px 6px 12px -2px var(--shadow-black-alpha-darkest), 0px 8px 20px 0px var(--shadow-black-alpha-darkest);--effect-1-default-lg:0px 2px 2px -1px var(--shadow-black-alpha-dark), 0px 6px 12px -2px var(--shadow-black-alpha-dark), 0px 8px 20px 0px var(--shadow-black-alpha-dark);--effect-1-default-base:0px 2px 2px -1px var(--shadow-black-alpha-base), 0px 6px 12px -2px var(--shadow-black-alpha-base), 0px 8px 20px 0px var(--shadow-black-alpha-base);--effect-1-default-sm:0px 2px 2px -1px var(--shadow-black-alpha-light), 0px 6px 12px -2px var(--shadow-black-alpha-light), 0px 8px 20px 0px var(--shadow-black-alpha-light);--effect-1-default-xs:0px 2px 2px -1px var(--shadow-black-alpha-lightest), 0px 6px 12px -2px var(--shadow-black-alpha-lightest), 0px 8px 20px 0px var(--shadow-black-alpha-lightest);--effect-1-hover-xl:0px 2px 2px -1px var(--shadow-black-alpha-darkest), 0px 6px 12px -2px var(--shadow-black-alpha-darkest), 0px 8px 20px 0px var(--shadow-black-alpha-darkest);--effect-1-hover-lg:0px 2px 2px -1px var(--shadow-black-alpha-dark), 0px 6px 12px 2px var(--shadow-black-alpha-dark), 0px 8px 20px 4px var(--shadow-black-alpha-dark);--effect-1-hover-base:0px 2px 2px -1px var(--shadow-black-alpha-base), 0px 6px 12px 2px var(--shadow-black-alpha-base), 0px 8px 20px 4px var(--shadow-black-alpha-base);--effect-1-hover-sm:0px 2px 2px -1px var(--shadow-black-alpha-light), 0px 6px 12px 2px var(--shadow-black-alpha-light), 0px 8px 20px 4px var(--shadow-black-alpha-light);--effect-1-hover-xs:0px 2px 2px -1px var(--shadow-black-alpha-lightest), 0px 6px 12px 2px var(--shadow-black-alpha-lightest), 0px 8px 20px 4px var(--shadow-black-alpha-lightest);--effect-2-default-xl:0px 0px 20px 3px var(--shadow-black-alpha-darkest);--effect-2-default-lg:0px 0px 20px 3px var(--shadow-black-alpha-dark);--effect-2-default-base:0px 0px 20px 3px var(--shadow-black-alpha-base);--effect-2-default-sm:0px 0px 20px 3px var(--shadow-black-alpha-light);--effect-2-default-xs:0px 0px 20px 6px var(--shadow-black-alpha-lightest);--effect-2-hover-xl:0px 0px 20px 8px var(--shadow-black-alpha-darkest);--effect-2-hover-lg:0px 0px 20px 8px var(--shadow-black-alpha-dark);--effect-2-hover-base:0px 0px 20px 8px var(--shadow-black-alpha-base);--effect-2-hover-sm:0px 0px 20px 8px var(--shadow-black-alpha-light);--effect-2-hover-xs:0px 0px 20px 8px var(--shadow-black-alpha-lightest);--primary-focus:0px 0px 0px 2px var(--static-light), 0px 0px 0px 4px var(--primary-light);--secondary-focus:0px 0px 0px 2px var(--static-light), 0px 0px 0px 4px var(--states-info-base);--info-focus:0px 0px 0px 2px var(--static-light), 0px 0px 0px 4px var(--states-info-sub-base);--secondary-light-focus:0px 0px 0px 1px var(--static-light), 0px 0px 0px 2px var(--states-info-base);--neutral-focus:0px 0px 0px 2px var(--static-light), 0px 0px 0px 4px var(--background-light);--radius-none:0px;--radius-xxs:2px;--radius-xs:4px;--radius-s:6px;--radius-m-base:8px;--radius-l:12px;--radius-xl:16px;--radius-2xl:20px;--radius-3xl:24px;--radius-4xl:32px;--radius-full:999px;--spacing-none:0px;--spacing-px:1px;--spacing-xxs:2px;--spacing-xs:4px;--spacing-s:6px;--spacing-m-base:8px;--spacing-l:10px;--spacing-xl:12px;--spacing-2xl:14px;--spacing-4xl:16px;--spacing-5xl:20px;--spacing-6xl:24px;--spacing-7xl:28px;--spacing-8xl:32px;--spacing-9xl:36px;--spacing-10xl:40px;--spacing-11xl:44px;--spacing-12xl:48px;--spacing-14xl:56px;--spacing-15xl:60px;--spacing-16xl:64px;--spacing-20xl:80px;--spacing-24xl:96px;--spacing-28xl:112px;--spacing-32xl:128px;--spacing-36xl:144px;--spacing-40xl:160px;--spacing-44xl:176px;--spacing-48xl:192px;--spacing-52xl:208px;--spacing-56xl:224px;--spacing-60xl:240px;--spacing-64xl:256px;--spacing-72xl:288px;--spacing-80xl:320px;--spacing-96xl:384px;--primary-lightest:var(--primary-50);--secondary-lightest:var(--secondary-50);--static-dark:var(--static-black);--static-light:var(--static-white);--secondary-light:var(--secondary-100);--secondary-sub-base:var(--secondary-300);--secondary-base:var(--secondary-500);--secondary-dark:var(--secondary-600);--secondary-darkest:var(--secondary-800);--text-lightest:var(--neutral-50);--text-light:var(--neutral-300);--text-sub-base:var(--neutral-400);--text-base:var(--neutral-500);--text-dark:var(--neutral-600);--text-darkest:var(--neutral-800);--primary-light:var(--primary-100);--primary-sub-base:var(--primary-300);--primary-base:var(--primary-500);--primary-dark:var(--primary-700);--primary-darkest:var(--primary-800);--background-lightest:var(--neutral-50);--background-light:var(--neutral-200);--background-sub-base:var(--neutral-300);--background-base:var(--neutral-500);--background-dark:var(--neutral-600);--background-darkest:var(--neutral-800);--frames-lightest:var(--neutral-0);--border-lightest:var(--neutral-50);--icon-lightest:var(--neutral-50);--icon-light:var(--neutral-200);--icon-sub-base:var(--neutral-300);--icon-base:var(--neutral-500);--icon-dark:var(--neutral-600);--icon-darkest:var(--neutral-800);--border-light:var(--neutral-200);--border-sub-base:var(--neutral-300);--border-base:var(--neutral-500);--border-dark:var(--neutral-600);--border-darkest:var(--neutral-800);--frames-light:var(--neutral-50);--frames-sub-base:var(--neutral-400);--frames-base:var(--neutral-600);--frames-dark:var(--neutral-900);--frames-darkest:var(--neutral-1000);--shadow-black-alpha-lightest:var(--alpha-neutral-neutral-500-2);--shadow-black-alpha-light:var(--alpha-neutral-neutral-500-4);--shadow-black-alpha-base:var(--alpha-neutral-neutral-500-8);--shadow-black-alpha-dark:var(--alpha-neutral-neutral-500-12);--shadow-black-alpha-darkest:var(--alpha-neutral-neutral-500-16);--overlay-black-none:var(--alpha-base-black-none);--overlay-black-xxlightest:var(--alpha-base-black-2);--overlay-black-xlightest:var(--alpha-base-black-8);--overlay-black-lightest:var(--alpha-base-black-16);--overlay-black-light:var(--alpha-base-black-32);--overlay-black-base:var(--alpha-base-black-48);--overlay-black-dark:var(--alpha-base-black-64);--overlay-black-darkest:var(--alpha-base-black-72);--states-info-lightest:var(--blue-50);--overlay-white-lightest:var(--alpha-base-white-16);--overlay-white-light:var(--alpha-base-white-32);--overlay-white-base:var(--alpha-base-white-48);--overlay-white-dark:var(--alpha-base-white-64);--overlay-white-darkest:var(--alpha-base-white-72);--states-info-light:var(--blue-100);--states-lightest:var(--neutral-50);--states-info-sub-base:var(--blue-200);--states-light:var(--neutral-300);--states-base:var(--secondary-500);--states-info-base:var(--blue-500);--states-info-dark:var(--blue-700);--states-dark:var(--neutral-600);--states-darkest:var(--neutral-800);--states-info-darkest:var(--blue-800);--states-success-lightest:var(--green-50);--states-success-light:var(--green-100);--states-success-sub-base:var(--green-200);--states-success-base:var(--green-500);--states-success-dark:var(--green-700);--states-danger-lightest:var(--red-50);--states-success-darkest:var(--green-800);--states-danger-light:var(--red-100);--states-danger-sub-base:var(--red-300);--states-danger-base:var(--red-500);--states-danger-dark:var(--red-700);--states-warning-lightest:var(--yellow-100);--states-danger-darkest:var(--red-800);--states-warning-light:var(--yellow-200);--states-warning-sub-base:var(--yellow-300);--states-warning-base:var(--yellow-500);--states-warning-dark:var(--yellow-600);--states-verified-lightest:var(--blue-50);--states-warning-darkest:var(--yellow-800);--states-verified-light:var(--blue-100);--states-verified-sub-base:var(--blue-200);--states-verified-base:var(--blue-300);--states-verified-dark:var(--blue-400);--states-verified-darkest:var(--blue-500);--shadow-blue-alpha-lightest:var(--alpha-blue-blue-500-2);--shadow-blue-alpha-light:var(--alpha-blue-blue-500-4);--shadow-blue-alpha-base:var(--alpha-blue-blue-500-8);--shadow-blue-alpha-dark:var(--alpha-blue-blue-500-12);--shadow-blue-alpha-darkest:var(--alpha-blue-blue-500-16);--color:#ffffff;--skeleton-skeleton-gradient-none:#f9fafc00;--skeleton-skeleton-gradient:#f9fafc;--button-sizes-large-radius:var(--radius-m-base);--button-sizes-large-gap:var(--spacing-m-base);--button-sizes-large-h-padding:var(--spacing-2xl);--button-sizes-large-v-padding:var(--spacing-xl);--button-sizes-large-full-padding:var(--spacing-xl);--button-sizes-large-icon-size:var(--spacing-6xl);--button-sizes-base-radius:var(--radius-m-base);--button-sizes-base-gap:var(--spacing-s);--button-sizes-base-h-padding:var(--spacing-l);--button-sizes-base-v-padding:var(--spacing-m-base);--button-sizes-base-full-padding:var(--spacing-m-base);--button-sizes-base-icon-size:var(--spacing-6xl);--button-sizes-small-radius:var(--radius-m-base);--button-sizes-small-gap:var(--spacing-xs);--button-sizes-small-h-padding:var(--spacing-m-base);--button-sizes-small-v-padding:var(--spacing-s);--button-sizes-small-full-padding:var(--spacing-s);--button-sizes-small-icon-size:var(--spacing-5xl);--link-button-sizes-large-radius:var(--radius-none);--link-button-sizes-large-gap:var(--spacing-xs);--link-button-sizes-large-h-padding:var(--spacing-none);--link-button-sizes-large-v-padding:var(--spacing-none);--link-button-sizes-large-full-padding:var(--spacing-s);--link-button-sizes-large-icon-size:var(--spacing-6xl);--link-button-sizes-base-radius:var(--radius-none);--link-button-sizes-base-gap:var(--spacing-xs);--link-button-sizes-base-h-padding:var(--spacing-none);--link-button-sizes-base-v-padding:var(--spacing-none);--link-button-sizes-base-full-padding:var(--spacing-s);--link-button-sizes-base-icon-size:var(--spacing-5xl);--link-button-sizes-small-radius:var(--radius-none);--link-button-sizes-small-gap:var(--spacing-xs);--link-button-sizes-small-h-padding:var(--spacing-none);--link-button-sizes-small-v-padding:var(--spacing-none);--link-button-sizes-small-full-padding:var(--spacing-s);--link-button-sizes-small-icon-size:var(--spacing-4xl);--fab-button-sizes-large-radius:var(--radius-s);--fab-button-sizes-large-gap:var(--spacing-xs);--fab-button-sizes-large-h-padding:var(--spacing-2xl);--fab-button-sizes-large-v-padding:var(--spacing-2xl);--fab-button-sizes-large-full-padding:var(--spacing-xl);--fab-button-sizes-large-icon-size:var(--spacing-7xl);--fab-button-sizes-base-radius:var(--radius-s);--fab-button-sizes-base-gap:var(--spacing-xs);--fab-button-sizes-base-h-padding:var(--spacing-xl);--fab-button-sizes-base-v-padding:var(--spacing-xl);--fab-button-sizes-base-full-padding:var(--spacing-xl);--fab-button-sizes-base-icon-size:var(--spacing-6xl);--fab-button-sizes-small-radius:var(--radius-s);--fab-button-sizes-small-gap:var(--spacing-xs);--fab-button-sizes-small-h-padding:var(--spacing-l);--fab-button-sizes-small-v-padding:var(--spacing-l);--fab-button-sizes-small-full-padding:var(--spacing-xl);--fab-button-sizes-small-icon-size:var(--spacing-5xl);--segmented-button-sizes-large-radius:var(--radius-none);--segmented-button-sizes-large-gap:var(--spacing-xs);--segmented-button-sizes-large-h-padding:var(--spacing-4xl);--segmented-button-sizes-large-v-padding:var(--spacing-m-base);--segmented-button-sizes-large-full-padding:var(--spacing-m-base);--segmented-button-sizes-large-icon-size:var(--spacing-6xl);--segmented-button-sizes-base-radius:var(--radius-none);--segmented-button-sizes-base-gap:var(--spacing-xs);--segmented-button-sizes-base-h-padding:var(--spacing-xl);--segmented-button-sizes-base-v-padding:var(--spacing-s);--segmented-button-sizes-base-full-padding:var(--spacing-s);--segmented-button-sizes-base-icon-size:var(--spacing-6xl);--segmented-button-sizes-small-radius:var(--radius-none);--segmented-button-sizes-small-gap:var(--spacing-xs);--segmented-button-sizes-small-h-padding:var(--spacing-m-base);--segmented-button-sizes-small-v-padding:var(--spacing-xs);--segmented-button-sizes-small-full-padding:var(--spacing-xs);--segmented-button-sizes-small-icon-size:var(--spacing-6xl);--card-body-relaxed-h-padding:var(--spacing-4xl);--card-body-relaxed-v-padding:var(--spacing-4xl);--card-body-relaxed-gap:var(--spacing-m-base);--card-haeder-base-h-padding:var(--spacing-4xl);--card-haeder-base-v-padding:var(--spacing-xl);--card-haeder-base-more-icon-size:var(--spacing-10xl);--card-haeder-base-gap:var(--spacing-m-base);--card-haeder-small-h-padding:var(--spacing-4xl);--card-haeder-small-v-padding:var(--spacing-l);--card-haeder-small-more-icon-size:var(--spacing-10xl);--card-haeder-small-gap:var(--spacing-s);--card-body-base-h-padding:var(--spacing-4xl);--card-body-base-v-padding:var(--spacing-xl);--card-body-base-gap:var(--spacing-s);--card-body-tight-h-padding:var(--spacing-4xl);--card-body-tight-v-padding:var(--spacing-m-base);--card-body-tight-gap:var(--spacing-xs);--card-image-full-screen-h-padding:var(--spacing-none);--card-image-full-screen-v-padding:var(--spacing-none);--card-image-windowed-h-padding:var(--spacing-4xl);--card-image-windowed-v-padding:var(--spacing-4xl);--card-footer-base-h-padding:var(--spacing-4xl);--card-footer-base-v-padding:var(--spacing-4xl);--card-footer-base-gap:var(--spacing-m-base);--chips-large-radius:var(--radius-s);--chips-large-h-padding:var(--spacing-m-base);--chips-large-v-padding:var(--spacing-xs);--chips-large-gap:var(--spacing-s);--chips-large-icon-size:var(--spacing-5xl);--chips-base-radius:var(--radius-s);--chips-base-h-padding:var(--spacing-s);--chips-base-v-padding:var(--spacing-xxs);--chips-base-gap:var(--spacing-xs);--chips-base-icon-size:var(--spacing-4xl);--chips-small-radius:var(--radius-s);--chips-small-h-padding:var(--spacing-xs);--chips-small-v-padding:var(--spacing-px);--chips-small-gap:var(--spacing-xxs);--chips-small-icon-size:var(--spacing-2xl);--input-external-label-large-text-area-radius:var(--radius-m-base);--input-external-label-large-icon-size:var(--spacing-6xl);--input-external-label-large-container-gap:var(--spacing-xs);--input-external-label-large-text-field-gap:var(--spacing-xs);--input-external-label-large-label-h-padding:var(--spacing-m-base);--input-external-label-large-label-v-padding:var(--spacing-none);--input-external-label-large-input-h-padding:var(--spacing-xl);--input-external-label-large-input-v-padding:var(--spacing-xl);--input-external-label-large-input-gap:var(--spacing-xs);--input-external-label-base-text-area-radius:var(--radius-m-base);--input-external-label-base-icon-size:var(--spacing-5xl);--input-external-label-base-div-gap:var(--spacing-xs);--input-external-label-base-text-field-gap:var(--spacing-xs);--input-external-label-base-label-h-padding:var(--spacing-m-base);--input-external-label-base-label-v-padding:var(--spacing-none);--input-external-label-base-input-h-padding:var(--spacing-l);--input-external-label-base-input-v-padding:var(--spacing-l);--input-external-label-base-input-gap:var(--spacing-xs);--input-external-label-small-text-area-radius:var(--radius-m-base);--input-external-label-small-icon-size:var(--spacing-5xl);--input-external-label-small-container-gap:var(--spacing-xs);--input-external-label-small-text-field-gap:var(--spacing-xxs);--input-external-label-small-label-h-padding:var(--spacing-s);--input-external-label-small-label-v-padding:var(--spacing-none);--input-external-label-small-input-h-padding:var(--spacing-m-base);--input-external-label-small-input-v-padding:var(--spacing-s);--input-external-label-small-input-gap:var(--spacing-xs);--basic-radio-container-radius:var(--radius-none);--basic-radio-container-h-padding:var(--spacing-none);--basic-radio-container-v-padding:var(--spacing-none);--basic-radio-container-gap:var(--spacing-s);--basic-radio-content-gap:var(--spacing-m-base);--basic-radio-text-gap:var(--spacing-none);--basic-radio-button-size:var(--spacing-6xl);--card-radio-container-radius:var(--radius-m-base);--card-radio-container-h-padding:var(--spacing-xl);--card-radio-container-v-padding:var(--spacing-xl);--card-radio-container-gap:var(--spacing-m-base);--card-radio-content-gap:var(--spacing-m-base);--card-radio-text-gap:var(--spacing-none);--card-radio-button-size:var(--spacing-6xl);--avatar-radio-container-radius:var(--radius-m-base);--avatar-radio-container-h-padding:var(--spacing-xl);--avatar-radio-container-v-padding:var(--spacing-xl);--avatar-radio-container-gap:var(--spacing-xl);--avatar-radio-v-content-gap:var(--spacing-m-base);--avatar-radio-h-content-gap:var(--spacing-m-base);--avatar-radio-text-gap:var(--spacing-none);--avatar-radio-button-size:var(--spacing-6xl);--avatar-radio-avatar-size:var(--spacing-12xl);--breadcrumb-container-gap:var(--spacing-xs);--breadcrumb-symbol-size:var(--spacing-5xl);--basic-item-icon-size:var(--spacing-4xl);--backgrounded-item-icon-size:var(--spacing-4xl);--backgrounded-item-v-padding:var(--spacing-xxs);--backgrounded-item-gap:var(--spacing-xxs);--basic-item-h-padding:var(--spacing-none);--backgrounded-item-h-padding:var(--spacing-s);--basic-item-v-padding:var(--spacing-none);--basic-item-gap:var(--spacing-xxs);--pagination-cell-small-cell-radius:var(--radius-m-base);--pagination-cell-small-cell-size:var(--spacing-6xl);--pagination-cell-base-cell-radius:var(--radius-m-base);--pagination-cell-base-cell-size:var(--spacing-8xl);--pagination-cell-large-cell-radius:var(--radius-m-base);--pagination-cell-large-cell-size:var(--spacing-10xl);--pagination-base-tag-gap:var(--spacing-none);--pagination-base-right-gap:var(--spacing-xl);--pagination-base-container-gap:var(--spacing-xl);--pagination-base-container-v-padding:var(--spacing-xxs);--pagination-base-arrow-gap:var(--spacing-xs);--pagination-base-gap:var(--spacing-s);--slider-h-padding:var(--spacing-none);--slider-v-padding:var(--spacing-none);--slider-gap:var(--spacing-xxs);--slider-content-gap:var(--spacing-none);--slider-slider-h-padding:var(--spacing-m-base);--slider-slider-v-padding:var(--spacing-s);--badge-small-basic-radius:var(--radius-xs);--badge-small-basic-gap:0;--badge-small-basic-left-padding:var(--spacing-s);--badge-small-basic-right-padding:var(--spacing-s);--badge-small-basic-v-padding:var(--spacing-none);--badge-small-basic-icon-size:0;--badge-small-left-icon-radius:var(--radius-xs);--badge-small-left-icon-gap:var(--spacing-none);--badge-small-left-icon-left-padding:var(--spacing-xs);--badge-small-left-icon-right-padding:var(--spacing-s);--badge-small-left-icon-v-padding:var(--spacing-none);--badge-small-left-icon-icon-size:var(--spacing-2xl);--badge-small-right-icon-radius:var(--radius-xs);--badge-small-right-icon-gap:var(--spacing-none);--badge-small-right-icon-left-padding:var(--spacing-s);--badge-small-right-icon-right-padding:var(--spacing-xs);--badge-small-right-icon-v-padding:var(--spacing-none);--badge-small-right-icon-icon-size:var(--spacing-2xl);--badge-base-basic-radius:var(--radius-s);--badge-base-basic-gap:0;--badge-base-basic-left-padding:var(--spacing-m-base);--badge-base-basic-right-padding:var(--spacing-m-base);--badge-base-basic-v-padding:var(--spacing-px);--badge-base-basic-icon-size:0;--badge-base-left-icon-radius:var(--radius-s);--badge-base-left-icon-gap:var(--spacing-xxs);--badge-base-left-icon-left-padding:var(--spacing-xs);--badge-base-left-icon-right-padding:var(--spacing-m-base);--badge-base-left-icon-v-padding:var(--spacing-px);--badge-base-left-icon-icon-size:var(--spacing-4xl);--badge-base-right-icon-radius:var(--radius-s);--badge-base-right-icon-gap:var(--spacing-xxs);--badge-base-right-icon-left-padding:var(--spacing-m-base);--badge-base-right-icon-right-padding:var(--spacing-xs);--badge-base-right-icon-v-padding:var(--spacing-px);--badge-base-right-icon-icon-size:var(--spacing-4xl);--badge-large-basic-radius:var(--radius-m-base);--badge-large-basic-gap:0;--badge-large-basic-left-padding:var(--spacing-l);--badge-large-basic-right-padding:var(--spacing-l);--badge-large-basic-v-padding:var(--spacing-xxs);--badge-large-basic-icon-size:0;--badge-large-left-icon-radius:var(--radius-m-base);--badge-large-left-icon-gap:var(--spacing-xs);--badge-large-left-icon-left-padding:var(--spacing-s);--badge-large-left-icon-right-padding:var(--spacing-l);--badge-large-left-icon-v-padding:var(--spacing-xxs);--badge-large-left-icon-icon-size:var(--spacing-4xl);--badge-large-right-icon-radius:var(--radius-m-base);--badge-large-right-icon-gap:var(--spacing-xs);--badge-large-right-icon-left-padding:var(--spacing-l);--badge-large-right-icon-right-padding:var(--spacing-s);--badge-large-right-icon-v-padding:var(--spacing-xxs);--badge-large-right-icon-icon-size:var(--spacing-4xl);--datepicker-items-base-radius:var(--radius-m-base);--datepicker-items-base-size:var(--spacing-10xl);--datepicker-items-small-radius:var(--radius-m-base);--datepicker-items-small-size:var(--spacing-8xl);--datepicker-footer-base-h-padding:var(--spacing-4xl);--datepicker-footer-base-v-padding:var(--spacing-4xl);--datepicker-footer-base-gap:var(--spacing-m-base);--datepicker-header-base-h-padding:var(--spacing-4xl);--datepicker-header-base-top-padding:var(--spacing-m-base);--datepicker-header-base-bottom-padding:var(--spacing-xs);--datepicker-header-base-navigation-gap:var(--spacing-none);--datepicker-header-base-date-text-gap:var(--spacing-xs);--datepicker-header-base-date-text-h-padding:var(--spacing-m-base);--datepicker-body-base-day-h-padding:var(--spacing-4xl);--datepicker-body-base-day-v-padding:var(--spacing-xl);--datepicker-body-base-day-row-group-gap:var(--spacing-xs);--datepicker-body-base-day-row-gap:var(--spacing-xs);--datepicker-body-base-month-year-h-padding:var(--spacing-4xl);--datepicker-body-base-month-year-v-padding:var(--spacing-7xl);--datepicker-body-base-month-year-row-gap:var(--spacing-xs);--dialog-header-base-h-padding:var(--spacing-4xl);--dialog-header-base-v-padding:var(--spacing-xl);--dialog-header-base-sign-size:var(--spacing-12xl);--dialog-header-base-close-icon-size:var(--spacing-6xl);--dialog-header-base-gap:var(--spacing-m-base);--dialog-header-small-h-padding:var(--spacing-4xl);--dialog-header-small-v-padding:var(--spacing-l);--dialog-header-small-sign-size:var(--spacing-11xl);--dialog-header-small-close-icon-size:var(--spacing-6xl);--dialog-header-small-gap:var(--spacing-s);--dialog-footer-base-h-padding:var(--spacing-4xl);--dialog-footer-base-v-padding:var(--spacing-4xl);--dialog-footer-base-gap:var(--spacing-m-base);--dialog-body-base-h-padding:var(--spacing-4xl);--dialog-body-base-v-padding:var(--spacing-4xl);--dialog-body-base-gap:var(--spacing-m-base);--dialog-extra-base-h-padding:var(--spacing-4xl);--dialog-extra-base-v-padding:var(--spacing-xl);--dialog-extra-base-gap:var(--spacing-m-base);--dropdown-items-basic-base-radius:var(--radius-m-base);--dropdown-items-basic-base-h-padding:var(--spacing-m-base);--dropdown-items-basic-base-v-padding:var(--spacing-m-base);--dropdown-items-basic-base-gap:var(--spacing-xs);--dropdown-items-basic-base-icon-size:var(--spacing-5xl);--dropdown-items-basic-large-radius:var(--radius-m-base);--dropdown-items-basic-large-h-padding:var(--spacing-m-base);--dropdown-items-basic-large-v-padding:var(--spacing-m-base);--dropdown-items-basic-large-gap:var(--spacing-xs);--dropdown-items-basic-large-icon-size:var(--spacing-5xl);--dropdown-items-basic-small-radius:var(--radius-m-base);--dropdown-items-basic-small-h-padding:var(--spacing-m-base);--dropdown-items-basic-small-v-padding:var(--spacing-s);--dropdown-items-basic-small-gap:var(--spacing-xs);--dropdown-items-basic-small-icon-size:var(--spacing-5xl);--dropdown-items-avatar-base-radius:var(--radius-m-base);--dropdown-items-avatar-base-h-padding:var(--spacing-m-base);--dropdown-items-avatar-base-v-padding:var(--spacing-m-base);--dropdown-items-avatar-base-gap:var(--spacing-xs);--dropdown-items-avatar-base-icon-size:var(--spacing-5xl);--dropdown-items-avatar-large-radius:var(--radius-m-base);--dropdown-items-avatar-large-h-padding:var(--spacing-m-base);--dropdown-items-avatar-large-v-padding:var(--spacing-m-base);--dropdown-items-avatar-large-gap:var(--spacing-xs);--dropdown-items-avatar-large-icon-size:var(--spacing-5xl);--dropdown-items-avatar-small-radius:var(--radius-m-base);--dropdown-items-avatar-small-h-padding:var(--spacing-m-base);--dropdown-items-avatar-small-v-padding:var(--spacing-s);--dropdown-items-avatar-small-gap:var(--spacing-xs);--dropdown-items-avatar-small-icon-size:var(--spacing-5xl);--dropdown-items-radio-checkbox-base-radius:var(--radius-m-base);--dropdown-items-radio-checkbox-base-h-padding:var(--spacing-m-base);--dropdown-items-radio-checkbox-base-v-padding:var(--spacing-s);--dropdown-items-radio-checkbox-base-container-gap:var(--spacing-m-base);--dropdown-items-radio-checkbox-large-radius:var(--radius-m-base);--dropdown-items-radio-checkbox-large-h-padding:var(--spacing-m-base);--dropdown-items-radio-checkbox-large-v-padding:var(--spacing-m-base);--dropdown-items-radio-checkbox-large-container-gap:var(--spacing-l);--dropdown-items-radio-checkbox-small-radius:var(--radius-m-base);--dropdown-items-radio-checkbox-small-h-padding:var(--spacing-m-base);--dropdown-items-radio-checkbox-small-v-padding:var(--spacing-xs);--dropdown-items-radio-checkbox-small-container-gap:var(--spacing-s);--editor-gap:var(--spacing-m-base);--editor-header-compact-h-padding:var(--spacing-4xl);--editor-body-h-padding:var(--spacing-4xl);--editor-body-v-padding:var(--spacing-4xl);--editor-body-gap:var(--spacing-xs);--editor-body-content-gap:var(--spacing-m-base);--editor-header-normal-h-padding:var(--spacing-4xl);--editor-header-normal-v-padding:var(--spacing-xl);--editor-header-normal-gap:var(--spacing-xl);--editor-header-normal-operation-gap:var(--spacing-m-base);--editor-header-compact-v-padding:var(--spacing-xl);--editor-header-compact-gap:var(--spacing-xl);--editor-header-compact-operation-gap:var(--spacing-m-base);--table-items-head-h-padding:0;--table-items-head-v-padding:0;--table-items-body-base-text-h-padding:var(--spacing-6xl);--table-items-body-base-text-text-h-padding:var(--spacing-6xl);--table-items-body-base-nontext-h-padding:var(--spacing-4xl);--table-items-body-base-nontext-v-padding:var(--spacing-4xl);--table-items-body-base-nontext-gap:var(--spacing-m-base);--table-items-body-base-text-text-v-padding:var(--spacing-s);--table-items-body-base-text-text-content-gap:var(--spacing-xxs);--table-items-body-base-text-text-gap:var(--spacing-m-base);--table-items-body-base-text-v-padding:var(--spacing-4xl);--table-items-body-base-text-gap:var(--spacing-m-base);--table-items-body-small-text-h-padding:var(--spacing-6xl);--table-items-body-small-text-text-h-padding:var(--spacing-6xl);--table-items-body-small-nontext-h-padding:var(--spacing-xl);--table-items-body-small-nontext-v-padding:var(--spacing-m-base);--table-items-body-small-nontext-gap:var(--spacing-m-base);--table-items-body-small-text-text-v-padding:var(--spacing-xxs);--table-items-body-small-text-text-content-gap:var(--spacing-xxs);--table-items-body-small-text-text-gap:var(--spacing-m-base);--table-items-body-small-text-v-padding:var(--spacing-m-base);--table-items-body-small-text-gap:var(--spacing-m-base);--table-items-head-base-text-h-padding:var(--spacing-xl);--table-items-head-base-text-text-h-padding:var(--spacing-xl);--table-items-head-base-nontext-h-padding:var(--spacing-4xl);--table-items-head-base-nontext-v-padding:var(--spacing-4xl);--table-items-head-base-nontext-gap:var(--spacing-m-base);--table-items-head-base-text-text-v-padding:var(--spacing-s);--table-items-head-base-text-text-content-h-padding:var(--spacing-xl);--table-items-head-base-text-text-content-gap:var(--spacing-xxs);--table-items-head-base-text-text-gap:var(--spacing-m-base);--table-items-head-base-text-v-padding:var(--spacing-4xl);--table-items-head-base-text-content-h-padding:var(--spacing-xl);--table-items-head-base-text-gap:var(--spacing-m-base);--table-items-head-small-text-h-padding:var(--spacing-xl);--table-items-head-small-text-text-h-padding:var(--spacing-xl);--table-items-head-small-nontext-h-padding:var(--spacing-xl);--table-items-head-small-nontext-v-padding:var(--spacing-xl);--table-items-head-small-nontext-gap:var(--spacing-m-base);--table-items-head-small-text-text-v-padding:var(--spacing-xs);--table-items-head-small-text-text-content-h-padding:var(--spacing-xl);--table-items-head-small-text-text-content-gap:var(--spacing-none);--table-items-head-small-text-text-gap:var(--spacing-m-base);--table-items-head-small-text-v-padding:var(--spacing-m-base);--table-items-head-small-text-gap:var(--spacing-m-base);--table-items-head-xsmall-text-h-padding:var(--spacing-xs);--table-items-head-xsmall-text-v-padding:var(--spacing-xs);--table-items-body-xsmall-text-v-padding:var(--spacing-xs);--table-items-body-xsmall-text-h-padding:var(--spacing-xs);--tabs-items-large-h-padding:var(--spacing-4xl);--tabs-items-large-v-padding:var(--spacing-2xl);--tabs-items-large-basic-active-gap:var(--spacing-xl);--tabs-items-large-basic-vertical-active-gap:var(--spacing-2xl);--tabs-items-large-tab-content-gap:var(--spacing-m-base);--tabs-items-large-tab-label-gap:var(--spacing-xs);--tabs-items-large-icon-size:var(--spacing-5xl);--tabs-items-base-h-padding:var(--spacing-2xl);--tabs-items-base-v-padding:var(--spacing-l);--tabs-items-base-basic-active-gap:var(--spacing-m-base);--tabs-items-base-basic-vertical-active-gap:var(--spacing-xl);--tabs-items-base-tab-content-gap:var(--spacing-m-base);--tabs-items-base-tab-label-gap:var(--spacing-xs);--tabs-items-base-icon-size:var(--spacing-5xl);--tabs-items-small-h-padding:var(--spacing-xl);--tabs-items-small-v-padding:var(--spacing-s);--tabs-items-small-basic-active-gap:var(--spacing-xs);--tabs-items-small-basic-vertical-active-gap:var(--spacing-l);--tabs-items-small-tab-content-gap:var(--spacing-s);--tabs-items-small-tab-label-gap:var(--spacing-xs);--tabs-items-small-icon-size:var(--spacing-5xl);--tabs-items-xsmall-h-padding:var(--spacing-l);--tabs-items-xsmall-v-padding:var(--spacing-xs);--tabs-items-xsmall-basic-active-gap:var(--spacing-xxs);--tabs-items-xsmall-basic-vertical-active-gap:var(--spacing-m-base);--tabs-items-xsmall-tab-content-gap:var(--spacing-xs);--tabs-items-xsmall-tab-label-gap:var(--spacing-xxs);--tabs-items-xsmall-icon-size:var(--spacing-4xl);--tabs-items-xxsmall-h-padding:var(--spacing-m-base);--tabs-items-xxsmall-v-padding:var(--spacing-xxs);--tabs-items-xxsmall-basic-active-gap:var(--spacing-px);--tabs-items-xxsmall-basic-vertical-active-gap:var(--spacing-s);--tabs-items-xxsmall-tab-content-gap:var(--spacing-xxs);--tabs-items-xxsmall-tab-label-gap:var(--spacing-px);--tabs-items-xxsmall-icon-size:var(--spacing-3xl);--timeline-h-padding:var(--spacing-m-base);--timeline-v-padding:var(--spacing-m-base);--timeline-gap:var(--spacing-m-base);--timeline-content-gap:var(--spacing-m-base);--timeline-text-gap:var(--spacing-m-base);--toast-base-radius:var(--radius-m-base);--toast-base-h-padding:var(--spacing-xl);--toast-base-v-padding:var(--spacing-xl);--toast-base-gap:var(--spacing-m-base);--toast-base-content-gap:var(--spacing-m-base);--toast-sign-base-size:var(--spacing-5xl);--toast-sign-base-full-padding:var(--spacing-s);--toast-sign-large-size:var(--spacing-6xl);--toast-sign-large-full-padding:var(--spacing-m-base);--toast-sign-small-size:var(--spacing-4xl);--toast-sign-small-full-padding:var(--spacing-xs);--notification-header-h-padding:var(--spacing-4xl);--notification-header-v-padding:var(--spacing-4xl);--notification-header-gap:var(--spacing-m-base);--notification-header-button-gap:var(--spacing-xs);--notification-body-h-padding:var(--spacing-4xl);--notification-footer-h-padding:var(--spacing-4xl);--notification-footer-v-padding:var(--spacing-xl);--notification-footer-gap:var(--spacing-m-base);--notification-body-v-padding:var(--spacing-xl);--notification-body-gap:var(--spacing-m-base);--notification-body-content-gap:var(--spacing-m-base);--notification-body-text-gap:var(--spacing-xs);--notification-body-header-gap:var(--spacing-m-base);--notification-body-head-gap:var(--spacing-none);--tooltips-base-max-width:var(--spacing-52xl);--tooltips-base-radius:var(--radius-m-base);--tooltips-base-h-padding:var(--spacing-xl);--tooltips-base-v-padding:var(--spacing-m-base);--tooltips-base-gap:var(--spacing-m-base);--tooltips-base-content-gap:var(--spacing-none);--accordion-base-radius:var(--radius-m-base);--accordion-base-h-padding:var(--spacing-xl);--accordion-base-v-padding:var(--spacing-xl);--accordion-base-gap:var(--spacing-s);--accordion-base-content-gap:var(--spacing-s);--accordion-large-radius:var(--radius-m-base);--accordion-large-h-padding:var(--spacing-xl);--accordion-large-v-padding:var(--spacing-xl);--accordion-large-gap:var(--spacing-m-base);--accordion-large-content-gap:var(--spacing-m-base);--spinner-size-xlarge:var(--spacing-12xl);--spinner-size-large:var(--spacing-10xl);--spinner-size-base:var(--spacing-8xl);--spinner-size-small:var(--spacing-6xl);--spinner-default-gap:var(--spacing-m-base);--spinner-centered-gap:var(--spacing-xs);--stepper-items-content-gap:var(--spacing-xs);--stepper-items-rail-gap:var(--spacing-xs);--stepper-segment-gap:var(--spacing-xs);--rating-basic-rate-gap:var(--spacing-none);--rating-basic-rate-content-gap:var(--spacing-xs);--rating-basic-rate-content-h-padding:var(--spacing-xxs);--rating-basic-rate-content-v-padding:var(--spacing-xxs);--rating-emoji-rate-gap:var(--spacing-m-base);--rating-bar-rate-compact-gap:var(--spacing-none);--rating-bar-rate-default-gap:var(--spacing-xs);--rating-number-rate-cells-h:var(--spacing-8xl);--rating-number-rate-cells-w:var(--spacing-8xl);--rating-number-rate-compact-gap:var(--spacing-none);--rating-number-rate-default-gap:var(--spacing-xs);--breakpoint-xl:1440px;--breakpoint-lg:1248px;--breakpoint-md:905px;--breakpoint-sm:600px;--breakpoint-xs:0px}[data-theme=dark]{--primary-lightest:var(--primary-900);--secondary-lightest:var(--secondary-900);--static-dark:var(--static-white);--static-light:var(--static-black);--secondary-light:var(--secondary-800);--secondary-sub-base:var(--secondary-600);--secondary-base:var(--secondary-400);--secondary-dark:var(--secondary-300);--secondary-darkest:var(--secondary-100);--text-lightest:var(--neutral-900);--text-light:var(--neutral-600);--text-sub-base:var(--neutral-500);--text-base:var(--neutral-400);--text-dark:var(--neutral-300);--text-darkest:var(--neutral-100);--primary-light:var(--primary-800);--primary-sub-base:var(--primary-700);--primary-base:var(--primary-500);--primary-dark:var(--primary-200);--primary-darkest:var(--primary-100);--background-lightest:var(--neutral-900);--background-light:var(--neutral-700);--background-sub-base:var(--neutral-600);--background-base:var(--neutral-400);--background-dark:var(--neutral-300);--background-darkest:var(--neutral-100);--frames-lightest:var(--neutral-1000);--border-lightest:var(--neutral-900);--icon-lightest:var(--neutral-900);--icon-light:var(--neutral-700);--icon-sub-base:var(--neutral-600);--icon-base:var(--neutral-400);--icon-dark:var(--neutral-300);--icon-darkest:var(--neutral-100);--border-light:var(--neutral-700);--border-sub-base:var(--neutral-600);--border-base:var(--neutral-400);--border-dark:var(--neutral-300);--border-darkest:var(--neutral-100);--frames-light:var(--neutral-900);--frames-sub-base:var(--neutral-600);--frames-base:var(--neutral-400);--frames-dark:var(--neutral-50);--frames-darkest:var(--neutral-0);--shadow-black-alpha-lightest:var(--alpha-base-black-2);--shadow-black-alpha-light:var(--alpha-base-black-4);--shadow-black-alpha-base:var(--alpha-base-black-8);--shadow-black-alpha-dark:var(--alpha-base-black-12);--shadow-black-alpha-darkest:var(--alpha-base-black-16);--overlay-black-none:var(--alpha-base-white-none);--overlay-black-xxlightest:var(--alpha-base-white-8);--overlay-black-xlightest:var(--alpha-base-white-12);--overlay-black-lightest:var(--alpha-base-white-16);--overlay-black-light:var(--alpha-base-white-32);--overlay-black-base:var(--alpha-base-white-48);--overlay-black-dark:var(--alpha-base-white-64);--overlay-black-darkest:var(--alpha-base-white-72);--states-info-lightest:var(--blue-900);--overlay-white-lightest:var(--alpha-base-black-16);--overlay-white-light:var(--alpha-base-black-32);--overlay-white-base:var(--alpha-base-black-48);--overlay-white-dark:var(--alpha-base-black-64);--overlay-white-darkest:var(--alpha-base-black-72);--states-info-light:var(--blue-800);--states-lightest:var(--neutral-50);--states-info-sub-base:var(--blue-700);--states-light:var(--neutral-300);--states-base:var(--secondary-500);--states-info-base:var(--blue-500);--states-info-dark:var(--blue-200);--states-dark:var(--neutral-600);--states-darkest:var(--neutral-800);--states-info-darkest:var(--blue-100);--states-success-lightest:var(--green-900);--states-success-light:var(--green-800);--states-success-sub-base:var(--green-700);--states-success-base:var(--green-500);--states-success-dark:var(--green-200);--states-danger-lightest:var(--red-900);--states-success-darkest:var(--green-100);--states-danger-light:var(--red-800);--states-danger-sub-base:var(--red-700);--states-danger-base:var(--red-400);--states-danger-dark:var(--red-300);--states-warning-lightest:var(--yellow-900);--states-danger-darkest:var(--red-100);--states-warning-light:var(--yellow-800);--states-warning-sub-base:var(--yellow-700);--states-warning-base:var(--yellow-500);--states-warning-dark:var(--yellow-400);--states-verified-lightest:var(--blue-600);--states-warning-darkest:var(--yellow-200);--states-verified-light:var(--blue-500);--states-verified-sub-base:var(--blue-400);--states-verified-base:var(--blue-300);--states-verified-dark:var(--blue-200);--states-verified-darkest:var(--blue-100);--shadow-blue-alpha-lightest:var(--alpha-blue-blue-500-2);--shadow-blue-alpha-light:var(--alpha-blue-blue-500-4);--shadow-blue-alpha-base:var(--alpha-blue-blue-500-8);--shadow-blue-alpha-dark:var(--alpha-blue-blue-500-12);--shadow-blue-alpha-darkest:var(--alpha-blue-blue-500-16);--color:#ffffff;--skeleton-skeleton-gradient-none:#52586600;--skeleton-skeleton-gradient:#525866;}@media (min-width: var(--breakpoint-md)){:root{--primary-213:32px}}@media (min-width: var(--breakpoint-md)){:root{--primary-213:50px}}.container{width:100%;margin:0 auto;padding:0 1rem}@media (min-width: 768px){.container{max-width:750px}}@media (min-width: 992px){.container{max-width:970px}}@media (min-width: 1200px){.container{max-width:1170px}}.row{display:flex;flex-wrap:wrap;margin-right:var(--spacing-m-base);margin-left:var(--spacing-m-base)}.col{flex:1;padding-right:var(--spacing-m-base);padding-left:var(--spacing-m-base)}@media (min-width: 576px){.col-6{flex:0 0 50%;max-width:50%}.col-12{flex:0 0 100%;max-width:100%}}@media (min-width: 768px){.col-4{flex:0 0 33.33%;max-width:33.33%}.col-8{flex:0 0 66.67%;max-width:66.67%}}@media (min-width: 992px){.col-3{flex:0 0 25%;max-width:25%}.col-9{flex:0 0 75%;max-width:75%}}.frame{border:1px solid lightgrey;border-radius:10px;padding:20px;margin:40px auto}.geologica{font-family:"Geologica", sans-serif}*{font-family:"Geologica", sans-serif}@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-toaster{position:fixed;display:flex;flex-direction:column;gap:16px;min-width:360px;max-width:480px;z-index:2000}.tk-toaster.top-right{top:20px;right:20px;bottom:unset;left:unset}.tk-toaster.top-left{top:20px;right:unset;bottom:unset;left:20px}.tk-toaster.bottom-right{top:unset;right:20px;bottom:20px;left:unset}.tk-toaster.bottom-left{top:unset;right:unset;bottom:20px;left:20px}.tk-toaster .tk-toast{opacity:0;transition:opacity 0.3s ease-out}.tk-toaster .tk-toast.open{opacity:1}.tk-table-filter-panel{width:220px;position:fixed;border-radius:16px;border:1px solid var(--border-light);background-color:var(--static-light);padding:8px;z-index:800;box-shadow:var(--effect-1-default-base);display:flex;flex-direction:column;padding:8px;gap:8px}.tk-table-filter-panel .tk-table-filter-checkbox-container{display:flex;flex-direction:column;gap:8px;max-height:200px;overflow-y:auto}.tk-table-filter-panel .tk-table-filter-checkbox-container .tk-table-filter-checkbox-item{display:flex;align-items:center;padding:4px 0}.tk-table-filter-panel .tk-table-filter-panel-buttons{display:flex;gap:8px}.tk-table-filter-panel .tk-table-filter-panel-buttons tk-button{flex:1}';

const NAMESPACE = 'core';
const BUILD = /* core */ { hydratedSelectorName: 'hydrated', lazyLoad: false, shadowDom: true, slotRelocation: true, updatable: true };

/*
 Stencil Client Platform v4.35.1 | MIT Licensed | https://stenciljs.com
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};

// src/utils/constants.ts
var SVG_NS = 'http://www.w3.org/2000/svg';
var HTML_NS = 'http://www.w3.org/1999/xhtml';

// src/client/client-host-ref.ts
var getHostRef = ref => {
  if (ref.__stencil__getHostRef) {
    return ref.__stencil__getHostRef();
  }
  return void 0;
};
var registerHost = (hostElement, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: hostElement,
    $cmpMeta$: cmpMeta,
    $instanceValues$: /* @__PURE__ */ new Map(),
  };
  {
    hostRef.$onReadyPromise$ = new Promise(r => (hostRef.$onReadyResolve$ = r));
    hostElement['s-p'] = [];
    hostElement['s-rc'] = [];
  }
  const ref = hostRef;
  hostElement.__stencil__getHostRef = () => ref;
  return ref;
};
var isMemberInElement = (elm, memberName) => memberName in elm;
var consoleError = (e, el) => (0, console.error)(e, el);

// src/client/client-style.ts
var styles = /* @__PURE__ */ new Map();
var SLOT_FB_CSS = 'slot-fb{display:contents}slot-fb[hidden]{display:none}';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS = ['formAssociatedCallback', 'formResetCallback', 'formDisabledCallback', 'formStateRestoreCallback'];
var win = typeof window !== 'undefined' ? window : {};
var H = win.HTMLElement || class {};
var plt = {
  $flags$: 0,
  $resourcesUrl$: '',
  jmp: h2 => h2(),
  raf: h2 => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts),
};
var supportsShadow = BUILD.shadowDom;
var supportsListenerOptions = /* @__PURE__ */ (() => {
  var _a;
  let supportsListenerOptions2 = false;
  try {
    (_a = win.document) == null
      ? void 0
      : _a.addEventListener(
          'e',
          null,
          Object.defineProperty({}, 'passive', {
            get() {
              supportsListenerOptions2 = true;
            },
          }),
        );
  } catch (e) {}
  return supportsListenerOptions2;
})();
var promiseResolve = v => Promise.resolve(v);
var supportsConstructableStylesheets = /* @__PURE__ */ (() => {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch (e) {}
  return false;
})();
var queuePending = false;
var queueDomReads = [];
var queueDomWrites = [];
var queueTask = (queue, write) => cb => {
  queue.push(cb);
  if (!queuePending) {
    queuePending = true;
    if (write && plt.$flags$ & 4 /* queueSync */) {
      nextTick(flush);
    } else {
      plt.raf(flush);
    }
  }
};
var consume = queue => {
  for (let i2 = 0; i2 < queue.length; i2++) {
    try {
      queue[i2](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }
  queue.length = 0;
};
var flush = () => {
  consume(queueDomReads);
  {
    consume(queueDomWrites);
    if ((queuePending = queueDomReads.length > 0)) {
      plt.raf(flush);
    }
  }
};
var nextTick = cb => promiseResolve().then(cb);
var writeTask = /* @__PURE__ */ queueTask(queueDomWrites, true);

// src/runtime/asset-path.ts
var getAssetPath = path => {
  const assetUrl = new URL(path, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin ? assetUrl.href : assetUrl.pathname;
};
var setAssetPath = path => (plt.$resourcesUrl$ = path);
var isComplexType = o => {
  o = typeof o;
  return o === 'object' || o === 'function';
};

// src/utils/query-nonce-meta-tag-content.ts
function queryNonceMetaTagContent(doc) {
  var _a, _b, _c;
  return (_c = (_b = (_a = doc.head) == null ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) == null ? void 0 : _b.getAttribute('content')) != null ? _c : void 0;
}

// src/utils/regular-expression.ts
var escapeRegExpSpecialCharacters = text => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// src/utils/result.ts
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr,
});
var ok = value => ({
  isOk: true,
  isErr: false,
  value,
});
var err = value => ({
  isOk: false,
  isErr: true,
  value,
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then(newVal => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw 'should never get here';
}
var unwrap = result => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = result => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};
function createShadowRoot(cmpMeta) {
  const shadowRoot = this.attachShadow({ mode: 'open' });
  if (supportsConstructableStylesheets) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(globalStyles);
    shadowRoot.adoptedStyleSheets.push(sheet);
  }
}
var updateFallbackSlotVisibility = elm => {
  const childNodes = internalCall(elm, 'childNodes');
  if (elm.tagName && elm.tagName.includes('-') && elm['s-cr'] && elm.tagName !== 'SLOT-FB') {
    getHostSlotNodes(childNodes, elm.tagName).forEach(slotNode => {
      if (slotNode.nodeType === 1 /* ElementNode */ && slotNode.tagName === 'SLOT-FB') {
        if (getSlotChildSiblings(slotNode, getSlotName(slotNode), false).length) {
          slotNode.hidden = true;
        } else {
          slotNode.hidden = false;
        }
      }
    });
  }
  let i2 = 0;
  for (i2 = 0; i2 < childNodes.length; i2++) {
    const childNode = childNodes[i2];
    if (childNode.nodeType === 1 /* ElementNode */ && internalCall(childNode, 'childNodes').length) {
      updateFallbackSlotVisibility(childNode);
    }
  }
};
var getSlottedChildNodes = childNodes => {
  const result = [];
  for (let i2 = 0; i2 < childNodes.length; i2++) {
    const slottedNode = childNodes[i2]['s-nr'] || void 0;
    if (slottedNode && slottedNode.isConnected) {
      result.push(slottedNode);
    }
  }
  return result;
};
function getHostSlotNodes(childNodes, hostName, slotName) {
  let i2 = 0;
  let slottedNodes = [];
  let childNode;
  for (; i2 < childNodes.length; i2++) {
    childNode = childNodes[i2];
    if (childNode['s-sr'] && (!hostName || childNode['s-hn'] === hostName) && slotName === void 0) {
      slottedNodes.push(childNode);
    }
    slottedNodes = [...slottedNodes, ...getHostSlotNodes(childNode.childNodes, hostName, slotName)];
  }
  return slottedNodes;
}
var getSlotChildSiblings = (slot, slotName, includeSlot = true) => {
  const childNodes = [];
  if ((includeSlot && slot['s-sr']) || !slot['s-sr']) childNodes.push(slot);
  let node = slot;
  while ((node = node.nextSibling)) {
    if (getSlotName(node) === slotName && (includeSlot || !node['s-sr'])) childNodes.push(node);
  }
  return childNodes;
};
var isNodeLocatedInSlot = (nodeToRelocate, slotName) => {
  if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
    if (nodeToRelocate.getAttribute('slot') === null && slotName === '') {
      return true;
    }
    if (nodeToRelocate.getAttribute('slot') === slotName) {
      return true;
    }
    return false;
  }
  if (nodeToRelocate['s-sn'] === slotName) {
    return true;
  }
  return slotName === '';
};
var getSlotName = node => (typeof node['s-sn'] === 'string' ? node['s-sn'] : (node.nodeType === 1 && node.getAttribute('slot')) || void 0);
function patchSlotNode(node) {
  if (node.assignedElements || node.assignedNodes || !node['s-sr']) return;
  const assignedFactory = elementsOnly =>
    function (opts) {
      const toReturn = [];
      const slotName = this['s-sn'];
      if (opts == null ? void 0 : opts.flatten) {
        console.error(`
          Flattening is not supported for Stencil non-shadow slots.
          You can use \`.childNodes\` to nested slot fallback content.
          If you have a particular use case, please open an issue on the Stencil repo.
        `);
      }
      const parent = this['s-cr'].parentElement;
      const slottedNodes = parent.__childNodes ? parent.childNodes : getSlottedChildNodes(parent.childNodes);
      slottedNodes.forEach(n => {
        if (slotName === getSlotName(n)) {
          toReturn.push(n);
        }
      });
      if (elementsOnly) {
        return toReturn.filter(n => n.nodeType === 1 /* ElementNode */);
      }
      return toReturn;
    }.bind(node);
  node.assignedElements = assignedFactory(true);
  node.assignedNodes = assignedFactory(false);
}
var patchCloneNode = HostElementPrototype => {
  const orgCloneNode = HostElementPrototype.cloneNode;
  HostElementPrototype.cloneNode = function (deep) {
    const srcNode = this;
    const isShadowDom = srcNode.shadowRoot && supportsShadow;
    const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
    if (!isShadowDom && deep) {
      let i2 = 0;
      let slotted, nonStencilNode;
      const stencilPrivates = ['s-id', 's-cr', 's-lr', 's-rc', 's-sc', 's-p', 's-cn', 's-sr', 's-sn', 's-hn', 's-ol', 's-nr', 's-si', 's-rf', 's-scs'];
      const childNodes = this.__childNodes || this.childNodes;
      for (; i2 < childNodes.length; i2++) {
        slotted = childNodes[i2]['s-nr'];
        nonStencilNode = stencilPrivates.every(privateField => !childNodes[i2][privateField]);
        if (slotted) {
          {
            clonedNode.appendChild(slotted.cloneNode(true));
          }
        }
        if (nonStencilNode) {
          clonedNode.appendChild(childNodes[i2].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};
function internalCall(node, method) {
  if ('__' + method in node) {
    const toReturn = node['__' + method];
    if (typeof toReturn !== 'function') return toReturn;
    return toReturn.bind(node);
  } else {
    if (typeof node[method] !== 'function') return node[method];
    return node[method].bind(node);
  }
}
var createTime = (fnName, tagName = '') => {
  {
    return () => {
      return;
    };
  }
};
var h = (nodeName, vnodeData, ...children) => {
  let child = null;
  let key = null;
  let slotName = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = c => {
    for (let i2 = 0; i2 < c.length; i2++) {
      child = c[i2];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== 'boolean') {
        if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
          child = String(child);
        }
        if (simple && lastSimple) {
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
          vNodeChildren.push(simple ? newVNode(null, child) : child);
        }
        lastSimple = simple;
      }
    }
  };
  walk(children);
  if (vnodeData) {
    if (vnodeData.key) {
      key = vnodeData.key;
    }
    if (vnodeData.name) {
      slotName = vnodeData.name;
    }
    {
      const classData = vnodeData.className || vnodeData.class;
      if (classData) {
        vnodeData.class =
          typeof classData !== 'object'
            ? classData
            : Object.keys(classData)
                .filter(k => classData[k])
                .join(' ');
      }
    }
  }
  if (typeof nodeName === 'function') {
    return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
  }
  const vnode = newVNode(nodeName, null);
  vnode.$attrs$ = vnodeData;
  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren;
  }
  {
    vnode.$key$ = key;
  }
  {
    vnode.$name$ = slotName;
  }
  return vnode;
};
var newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null,
  };
  {
    vnode.$attrs$ = null;
  }
  {
    vnode.$key$ = null;
  }
  {
    vnode.$name$ = null;
  }
  return vnode;
};
var Host = {};
var isHost = node => node && node.$tag$ === Host;
var vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate),
};
var convertToPublic = node => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$,
});
var convertToPrivate = node => {
  if (typeof node.vtag === 'function') {
    const vnodeData = { ...node.vattrs };
    if (node.vkey) {
      vnodeData.key = node.vkey;
    }
    if (node.vname) {
      vnodeData.name = node.vname;
    }
    return h(node.vtag, vnodeData, ...(node.vchildren || []));
  }
  const vnode = newVNode(node.vtag, node.vtext);
  vnode.$attrs$ = node.vattrs;
  vnode.$children$ = node.vchildren;
  vnode.$key$ = node.vkey;
  vnode.$name$ = node.vname;
  return vnode;
};
var createSupportsRuleRe = selector => {
  const safeSelector2 = escapeRegExpSpecialCharacters(selector);
  return new RegExp(
    // First capture group: match any context before the selector that's not inside @supports selector()
    // Using negative lookahead to avoid matching inside @supports selector(...) condition
    `(^|[^@]|@(?!supports\\s+selector\\s*\\([^{]*?${safeSelector2}))(${safeSelector2}\\b)`,
    'g',
  );
};
createSupportsRuleRe('::slotted');
createSupportsRuleRe(':host');
createSupportsRuleRe(':host-context');
var parsePropertyValue = (propValue, propType, isFormAssociated) => {
  if (propValue != null && !isComplexType(propValue)) {
    if (propType & 4 /* Boolean */) {
      if (isFormAssociated && typeof propValue === 'string') {
        return propValue === '' || !!propValue;
      } else {
        return propValue === 'false' ? false : propValue === '' || !!propValue;
      }
    }
    if (propType & 2 /* Number */) {
      return typeof propValue === 'string' ? parseFloat(propValue) : typeof propValue === 'number' ? propValue : NaN;
    }
    if (propType & 1 /* String */) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
var getElement = ref => ref;

// src/runtime/event-emitter.ts
var createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: detail => {
      return emitEvent(elm, name, {
        bubbles: !!((flags & 4) /* Bubbles */),
        composed: !!((flags & 2) /* Composed */),
        cancelable: !!((flags & 1) /* Cancellable */),
        detail,
      });
    },
  };
};
var emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
var rootAppliedStyles = /* @__PURE__ */ new WeakMap();
var registerStyle = (scopeId2, cssText, allowCS) => {
  let style = styles.get(scopeId2);
  if (supportsConstructableStylesheets && allowCS) {
    style = style || new CSSStyleSheet();
    if (typeof style === 'string') {
      style = cssText;
    } else {
      style.replaceSync(cssText);
    }
  } else {
    style = cssText;
  }
  styles.set(scopeId2, style);
};
var addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a;
  const scopeId2 = getScopeId(cmpMeta);
  const style = styles.get(scopeId2);
  if (!win.document) {
    return scopeId2;
  }
  styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : win.document;
  if (style) {
    if (typeof style === 'string') {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      let styleElm;
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, (appliedStyles = /* @__PURE__ */ new Set()));
      }
      if (!appliedStyles.has(scopeId2)) {
        {
          styleElm = win.document.createElement('style');
          styleElm.innerHTML = style;
          const nonce = (_a = plt.$nonce$) != null ? _a : queryNonceMetaTagContent(win.document);
          if (nonce != null) {
            styleElm.setAttribute('nonce', nonce);
          }
          if (!((cmpMeta.$flags$ & 1) /* shadowDomEncapsulation */)) {
            if (styleContainerNode.nodeName === 'HEAD') {
              const preconnectLinks = styleContainerNode.querySelectorAll('link[rel=preconnect]');
              const referenceNode2 = preconnectLinks.length > 0 ? preconnectLinks[preconnectLinks.length - 1].nextSibling : styleContainerNode.querySelector('style');
              styleContainerNode.insertBefore(styleElm, (referenceNode2 == null ? void 0 : referenceNode2.parentNode) === styleContainerNode ? referenceNode2 : null);
            } else if ('host' in styleContainerNode) {
              if (supportsConstructableStylesheets) {
                const stylesheet = new CSSStyleSheet();
                stylesheet.replaceSync(style);
                styleContainerNode.adoptedStyleSheets = [stylesheet, ...styleContainerNode.adoptedStyleSheets];
              } else {
                const existingStyleContainer = styleContainerNode.querySelector('style');
                if (existingStyleContainer) {
                  existingStyleContainer.innerHTML = style + existingStyleContainer.innerHTML;
                } else {
                  styleContainerNode.prepend(styleElm);
                }
              }
            } else {
              styleContainerNode.append(styleElm);
            }
          }
          if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            styleContainerNode.insertBefore(styleElm, null);
          }
        }
        if (cmpMeta.$flags$ & 4 /* hasSlotRelocation */) {
          styleElm.innerHTML += SLOT_FB_CSS;
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId2);
        }
      }
    } else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
      styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
    }
  }
  return scopeId2;
};
var attachStyles = hostRef => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
  const scopeId2 = addStyle(elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta);
  if (flags & 10 /* needsScopedEncapsulation */) {
    elm['s-sc'] = scopeId2;
    elm.classList.add(scopeId2 + '-h');
  }
  endAttachStyles();
};
var getScopeId = (cmp, mode) => 'sc-' + cmp.$tagName$;
var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags, initialRender) => {
  if (oldValue === newValue) {
    return;
  }
  let isProp = isMemberInElement(elm, memberName);
  let ln = memberName.toLowerCase();
  if (memberName === 'class') {
    const classList = elm.classList;
    const oldClasses = parseClassList(oldValue);
    let newClasses = parseClassList(newValue);
    {
      classList.remove(...oldClasses.filter(c => c && !newClasses.includes(c)));
      classList.add(...newClasses.filter(c => c && !oldClasses.includes(c)));
    }
  } else if (memberName === 'style') {
    {
      for (const prop in oldValue) {
        if (!newValue || newValue[prop] == null) {
          if (prop.includes('-')) {
            elm.style.removeProperty(prop);
          } else {
            elm.style[prop] = '';
          }
        }
      }
    }
    for (const prop in newValue) {
      if (!oldValue || newValue[prop] !== oldValue[prop]) {
        if (prop.includes('-')) {
          elm.style.setProperty(prop, newValue[prop]);
        } else {
          elm.style[prop] = newValue[prop];
        }
      }
    }
  } else if (memberName === 'key');
  else if (memberName === 'ref') {
    if (newValue) {
      newValue(elm);
    }
  } else if (!elm.__lookupSetter__(memberName) && memberName[0] === 'o' && memberName[1] === 'n') {
    if (memberName[2] === '-') {
      memberName = memberName.slice(3);
    } else if (isMemberInElement(win, ln)) {
      memberName = ln.slice(2);
    } else {
      memberName = ln[2] + memberName.slice(3);
    }
    if (oldValue || newValue) {
      const capture = memberName.endsWith(CAPTURE_EVENT_SUFFIX);
      memberName = memberName.replace(CAPTURE_EVENT_REGEX, '');
      if (oldValue) {
        plt.rel(elm, memberName, oldValue, capture);
      }
      if (newValue) {
        plt.ael(elm, memberName, newValue, capture);
      }
    }
  } else {
    const isComplex = isComplexType(newValue);
    if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
      try {
        if (!elm.tagName.includes('-')) {
          const n = newValue == null ? '' : newValue;
          if (memberName === 'list') {
            isProp = false;
          } else if (oldValue == null || elm[memberName] != n) {
            if (typeof elm.__lookupSetter__(memberName) === 'function') {
              elm[memberName] = n;
            } else {
              elm.setAttribute(memberName, n);
            }
          }
        } else if (elm[memberName] !== newValue) {
          elm[memberName] = newValue;
        }
      } catch (e) {}
    }
    let xlink = false;
    {
      if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
        memberName = ln;
        xlink = true;
      }
    }
    if (newValue == null || newValue === false) {
      if (newValue !== false || elm.getAttribute(memberName) === '') {
        if (xlink) {
          elm.removeAttributeNS(XLINK_NS, memberName);
        } else {
          elm.removeAttribute(memberName);
        }
      }
    } else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex && elm.nodeType === 1 /* ElementNode */) {
      newValue = newValue === true ? '' : newValue;
      if (xlink) {
        elm.setAttributeNS(XLINK_NS, memberName, newValue);
      } else {
        elm.setAttribute(memberName, newValue);
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = value => {
  if (typeof value === 'object' && value && 'baseVal' in value) {
    value = value.baseVal;
  }
  if (!value || typeof value !== 'string') {
    return [];
  }
  return value.split(parseClassListRegex);
};
var CAPTURE_EVENT_SUFFIX = 'Capture';
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + '$');

// src/runtime/vdom/update-element.ts
var updateElement = (oldVnode, newVnode, isSvgMode2, isInitialRender) => {
  const elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
  const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || {};
  const newVnodeAttrs = newVnode.$attrs$ || {};
  {
    for (const memberName of sortedAttrNames(Object.keys(oldVnodeAttrs))) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode2, newVnode.$flags$);
      }
    }
  }
  for (const memberName of sortedAttrNames(Object.keys(newVnodeAttrs))) {
    setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode2, newVnode.$flags$);
  }
};
function sortedAttrNames(attrNames) {
  return attrNames.includes('ref')
    ? // we need to sort these to ensure that `'ref'` is the last attr
      [...attrNames.filter(attr => attr !== 'ref'), 'ref']
    : // no need to sort, return the original array
      attrNames;
}
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var createElm = (oldParentVNode, newParentVNode, childIndex) => {
  var _a;
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i2 = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (!useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode2.$tag$ === 'slot') {
      newVNode2.$flags$ |= newVNode2.$children$
        ? // slot element has fallback content
          // still create an element that "mocks" the slot element
          2 /* isSlotFallback */
        : // slot element does not have fallback content
          // create an html comment we'll use to always reference
          // where actual slot content should sit next to
          1 /* isSlotReference */;
    }
  }
  if (newVNode2.$text$ !== null) {
    elm = newVNode2.$elm$ = win.document.createTextNode(newVNode2.$text$);
  } else if (newVNode2.$flags$ & 1 /* isSlotReference */) {
    elm = newVNode2.$elm$ = win.document.createTextNode('');
    {
      updateElement(null, newVNode2, isSvgMode);
    }
  } else {
    if (!isSvgMode) {
      isSvgMode = newVNode2.$tag$ === 'svg';
    }
    if (!win.document) {
      throw new Error(
        "You are trying to render a Stencil component in an environment that doesn't support the DOM. Make sure to populate the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window/window) object before rendering a component.",
      );
    }
    elm = newVNode2.$elm$ = win.document.createElementNS(
      isSvgMode ? SVG_NS : HTML_NS,
      !useNativeShadowDom && BUILD.slotRelocation && newVNode2.$flags$ & 2 /* isSlotFallback */ ? 'slot-fb' : newVNode2.$tag$,
    );
    if (isSvgMode && newVNode2.$tag$ === 'foreignObject') {
      isSvgMode = false;
    }
    {
      updateElement(null, newVNode2, isSvgMode);
    }
    if (newVNode2.$children$) {
      for (i2 = 0; i2 < newVNode2.$children$.length; ++i2) {
        childNode = createElm(oldParentVNode, newVNode2, i2);
        if (childNode) {
          elm.appendChild(childNode);
        }
      }
    }
    {
      if (newVNode2.$tag$ === 'svg') {
        isSvgMode = false;
      } else if (elm.tagName === 'foreignObject') {
        isSvgMode = true;
      }
    }
  }
  elm['s-hn'] = hostTagName;
  {
    if (newVNode2.$flags$ & (2 /* isSlotFallback */ | 1) /* isSlotReference */) {
      elm['s-sr'] = true;
      elm['s-cr'] = contentRef;
      elm['s-sn'] = newVNode2.$name$ || '';
      elm['s-rf'] = (_a = newVNode2.$attrs$) == null ? void 0 : _a.ref;
      patchSlotNode(elm);
      oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
      if (oldVNode && oldVNode.$tag$ === newVNode2.$tag$ && oldParentVNode.$elm$) {
        {
          putBackInOriginalLocation(oldParentVNode.$elm$, false);
        }
      }
    }
  }
  return elm;
};
var putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1 /* isTmpDisconnected */;
  const oldSlotChildNodes = Array.from(parentElm.__childNodes || parentElm.childNodes);
  for (let i2 = oldSlotChildNodes.length - 1; i2 >= 0; i2--) {
    const childNode = oldSlotChildNodes[i2];
    if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
      insertBefore(referenceNode(childNode).parentNode, childNode, referenceNode(childNode));
      childNode['s-ol'].remove();
      childNode['s-ol'] = void 0;
      childNode['s-sh'] = void 0;
      checkSlotRelocate = true;
    }
    if (recursive) {
      putBackInOriginalLocation(childNode, recursive);
    }
  }
  plt.$flags$ &= -2 /* isTmpDisconnected */;
};
var addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm = (parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm;
  let childNode;
  if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot;
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx);
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        insertBefore(containerElm, childNode, referenceNode(before));
      }
    }
  }
};
var removeVnodes = (vnodes, startIdx, endIdx) => {
  for (let index = startIdx; index <= endIdx; ++index) {
    const vnode = vnodes[index];
    if (vnode) {
      const elm = vnode.$elm$;
      nullifyVNodeRefs(vnode);
      if (elm) {
        {
          checkSlotFallbackVisibility = true;
          if (elm['s-ol']) {
            elm['s-ol'].remove();
          } else {
            putBackInOriginalLocation(elm, true);
          }
        }
        elm.remove();
      }
    }
  }
};
var updateChildren = (parentElm, oldCh, newVNode2, newCh, isInitialRender = false) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let idxInOld = 0;
  let i2 = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let node;
  let elmToMove;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode, isInitialRender)) {
      patch(oldStartVnode, newStartVnode, isInitialRender);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode, isInitialRender)) {
      patch(oldEndVnode, newEndVnode, isInitialRender);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode, isInitialRender)) {
      if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
        putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
      }
      patch(oldStartVnode, newEndVnode, isInitialRender);
      insertBefore(parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode, isInitialRender)) {
      if (oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot') {
        putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
      }
      patch(oldEndVnode, newStartVnode, isInitialRender);
      insertBefore(parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      idxInOld = -1;
      {
        for (i2 = oldStartIdx; i2 <= oldEndIdx; ++i2) {
          if (oldCh[i2] && oldCh[i2].$key$ !== null && oldCh[i2].$key$ === newStartVnode.$key$) {
            idxInOld = i2;
            break;
          }
        }
      }
      if (idxInOld >= 0) {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(oldCh && oldCh[newStartIdx], newVNode2, idxInOld);
        } else {
          patch(elmToMove, newStartVnode, isInitialRender);
          oldCh[idxInOld] = void 0;
          node = elmToMove.$elm$;
        }
        newStartVnode = newCh[++newStartIdx];
      } else {
        node = createElm(oldCh && oldCh[newStartIdx], newVNode2, newStartIdx);
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        {
          insertBefore(referenceNode(oldStartVnode.$elm$).parentNode, node, referenceNode(oldStartVnode.$elm$));
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode2, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
var isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    if (leftVNode.$tag$ === 'slot') {
      return leftVNode.$name$ === rightVNode.$name$;
    }
    if (!isInitialRender) {
      return leftVNode.$key$ === rightVNode.$key$;
    }
    if (isInitialRender && !leftVNode.$key$ && rightVNode.$key$) {
      leftVNode.$key$ = rightVNode.$key$;
    }
    return true;
  }
  return false;
};
var referenceNode = node => (node && node['s-ol']) || node;
var patch = (oldVNode, newVNode2, isInitialRender = false) => {
  const elm = (newVNode2.$elm$ = oldVNode.$elm$);
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode2.$children$;
  const tag = newVNode2.$tag$;
  const text = newVNode2.$text$;
  let defaultHolder;
  if (text === null) {
    {
      isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
    }
    {
      updateElement(oldVNode, newVNode2, isSvgMode);
    }
    if (oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (oldVNode.$text$ !== null) {
        elm.textContent = '';
      }
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (
      // don't do this on initial render as it can cause non-hydrated content to be removed
      !isInitialRender &&
      BUILD.updatable &&
      oldChildren !== null
    ) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }
    if (isSvgMode && tag === 'svg') {
      isSvgMode = false;
    }
  } else if ((defaultHolder = elm['s-cr'])) {
    defaultHolder.parentNode.textContent = text;
  } else if (oldVNode.$text$ !== text) {
    elm.data = text;
  }
};
var relocateNodes = [];
var markSlotContentForRelocation = elm => {
  let node;
  let hostContentNodes;
  let j;
  const children = elm.__childNodes || elm.childNodes;
  for (const childNode of children) {
    if (childNode['s-sr'] && (node = childNode['s-cr']) && node.parentNode) {
      hostContentNodes = node.parentNode.__childNodes || node.parentNode.childNodes;
      const slotName = childNode['s-sn'];
      for (j = hostContentNodes.length - 1; j >= 0; j--) {
        node = hostContentNodes[j];
        if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn'] && true) {
          if (isNodeLocatedInSlot(node, slotName)) {
            let relocateNodeData = relocateNodes.find(r => r.$nodeToRelocate$ === node);
            checkSlotFallbackVisibility = true;
            node['s-sn'] = node['s-sn'] || slotName;
            if (relocateNodeData) {
              relocateNodeData.$nodeToRelocate$['s-sh'] = childNode['s-hn'];
              relocateNodeData.$slotRefNode$ = childNode;
            } else {
              node['s-sh'] = childNode['s-hn'];
              relocateNodes.push({
                $slotRefNode$: childNode,
                $nodeToRelocate$: node,
              });
            }
            if (node['s-sr']) {
              relocateNodes.map(relocateNode => {
                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                  relocateNodeData = relocateNodes.find(r => r.$nodeToRelocate$ === node);
                  if (relocateNodeData && !relocateNode.$slotRefNode$) {
                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                  }
                }
              });
            }
          } else if (!relocateNodes.some(r => r.$nodeToRelocate$ === node)) {
            relocateNodes.push({
              $nodeToRelocate$: node,
            });
          }
        }
      }
    }
    if (childNode.nodeType === 1 /* ElementNode */) {
      markSlotContentForRelocation(childNode);
    }
  }
};
var nullifyVNodeRefs = vNode => {
  {
    vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
    vNode.$children$ && vNode.$children$.map(nullifyVNodeRefs);
  }
};
var insertBefore = (parent, newNode, reference) => {
  {
    return parent == null ? void 0 : parent.insertBefore(newNode, reference);
  }
};
var renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
  var _a, _b, _c, _d;
  const hostElm = hostRef.$hostElement$;
  const cmpMeta = hostRef.$cmpMeta$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const isHostElement = isHost(renderFnResults);
  const rootVnode = isHostElement ? renderFnResults : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
    cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
  }
  if (isInitialLoad && rootVnode.$attrs$) {
    for (const key of Object.keys(rootVnode.$attrs$)) {
      if (hostElm.hasAttribute(key) && !['key', 'ref', 'style', 'class'].includes(key)) {
        rootVnode.$attrs$[key] = hostElm[key];
      }
    }
  }
  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4 /* isHost */;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = hostElm.shadowRoot || hostElm;
  useNativeShadowDom = !!((cmpMeta.$flags$ & 1) /* shadowDomEncapsulation */) && !((cmpMeta.$flags$ & 128) /* shadowNeedsScopedCss */);
  {
    contentRef = hostElm['s-cr'];
    checkSlotFallbackVisibility = false;
  }
  patch(oldVNode, rootVnode, isInitialLoad);
  {
    plt.$flags$ |= 1 /* isTmpDisconnected */;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(rootVnode.$elm$);
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        if (!nodeToRelocate['s-ol'] && win.document) {
          const orgLocationNode = win.document.createTextNode('');
          orgLocationNode['s-nr'] = nodeToRelocate;
          insertBefore(nodeToRelocate.parentNode, (nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate);
        }
      }
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        const slotRefNode = relocateData.$slotRefNode$;
        if (slotRefNode) {
          const parentNodeRef = slotRefNode.parentNode;
          let insertBeforeNode = slotRefNode.nextSibling;
          {
            let orgLocationNode = (_a = nodeToRelocate['s-ol']) == null ? void 0 : _a.previousSibling;
            while (orgLocationNode) {
              let refNode = (_b = orgLocationNode['s-nr']) != null ? _b : null;
              if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === (refNode.__parentNode || refNode.parentNode)) {
                refNode = refNode.nextSibling;
                while (refNode === nodeToRelocate || (refNode == null ? void 0 : refNode['s-sr'])) {
                  refNode = refNode == null ? void 0 : refNode.nextSibling;
                }
                if (!refNode || !refNode['s-nr']) {
                  insertBeforeNode = refNode;
                  break;
                }
              }
              orgLocationNode = orgLocationNode.previousSibling;
            }
          }
          const parent = nodeToRelocate.__parentNode || nodeToRelocate.parentNode;
          const nextSibling = nodeToRelocate.__nextSibling || nodeToRelocate.nextSibling;
          if ((!insertBeforeNode && parentNodeRef !== parent) || nextSibling !== insertBeforeNode) {
            if (nodeToRelocate !== insertBeforeNode) {
              if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
              }
              insertBefore(parentNodeRef, nodeToRelocate, insertBeforeNode);
              if (nodeToRelocate.nodeType === 1 /* ElementNode */ && nodeToRelocate.tagName !== 'SLOT-FB') {
                nodeToRelocate.hidden = (_c = nodeToRelocate['s-ih']) != null ? _c : false;
              }
            }
          }
          nodeToRelocate && typeof slotRefNode['s-rf'] === 'function' && slotRefNode['s-rf'](slotRefNode);
        } else {
          if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
            if (isInitialLoad) {
              nodeToRelocate['s-ih'] = (_d = nodeToRelocate.hidden) != null ? _d : false;
            }
            nodeToRelocate.hidden = true;
          }
        }
      }
    }
    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(rootVnode.$elm$);
    }
    plt.$flags$ &= -2 /* isTmpDisconnected */;
    relocateNodes.length = 0;
  }
  contentRef = void 0;
};

// src/runtime/update-component.ts
var attachToAncestor = (hostRef, ancestorComponent) => {
  if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
    const index = ancestorComponent['s-p'].push(
      new Promise(
        r =>
          (hostRef.$onRenderResolve$ = () => {
            ancestorComponent['s-p'].splice(index - 1, 1);
            r();
          }),
      ),
    );
  }
};
var scheduleUpdate = (hostRef, isInitialLoad) => {
  {
    hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
  }
  if (hostRef.$flags$ & 4 /* isWaitingForChildren */) {
    hostRef.$flags$ |= 512 /* needsRerender */;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  return writeTask(dispatch);
};
var dispatchHooks = (hostRef, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
  const instance = elm;
  if (!instance) {
    throw new Error(
      `Can't render component <${elm.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`,
    );
  }
  let maybePromise;
  if (isInitialLoad) {
    maybePromise = safeCall(instance, 'componentWillLoad', void 0, elm);
  } else {
    maybePromise = safeCall(instance, 'componentWillUpdate', void 0, elm);
  }
  maybePromise = enqueue(maybePromise, () => safeCall(instance, 'componentWillRender', void 0, elm));
  endSchedule();
  return enqueue(maybePromise, () => updateComponent(hostRef, instance, isInitialLoad));
};
var enqueue = (maybePromise, fn) =>
  isPromisey(maybePromise)
    ? maybePromise.then(fn).catch(err2 => {
        console.error(err2);
        fn();
      })
    : fn();
var isPromisey = maybePromise => maybePromise instanceof Promise || (maybePromise && maybePromise.then && typeof maybePromise.then === 'function');
var updateComponent = async (hostRef, instance, isInitialLoad) => {
  var _a;
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
  const rc = elm['s-rc'];
  if (isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
  {
    callRender(hostRef, instance, elm, isInitialLoad);
  }
  if (rc) {
    rc.map(cb => cb());
    elm['s-rc'] = void 0;
  }
  endRender();
  endUpdate();
  {
    const childrenPromises = (_a = elm['s-p']) != null ? _a : [];
    const postUpdate = () => postUpdateComponent(hostRef);
    if (childrenPromises.length === 0) {
      postUpdate();
    } else {
      Promise.all(childrenPromises).then(postUpdate);
      hostRef.$flags$ |= 4 /* isWaitingForChildren */;
      childrenPromises.length = 0;
    }
  }
};
var callRender = (hostRef, instance, elm, isInitialLoad) => {
  try {
    instance = instance.render();
    {
      hostRef.$flags$ &= -17 /* isQueuedForUpdate */;
    }
    {
      hostRef.$flags$ |= 2 /* hasRendered */;
    }
    {
      {
        {
          renderVdom(hostRef, instance, isInitialLoad);
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
  return null;
};
var postUpdateComponent = hostRef => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime('postUpdate', tagName);
  const instance = elm;
  const ancestorComponent = hostRef.$ancestorComponent$;
  safeCall(instance, 'componentDidRender', void 0, elm);
  if (!((hostRef.$flags$ & 64) /* hasLoadedComponent */)) {
    hostRef.$flags$ |= 64 /* hasLoadedComponent */;
    {
      addHydratedFlag(elm);
    }
    safeCall(instance, 'componentDidLoad', void 0, elm);
    endPostUpdate();
    {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad();
      }
    }
  } else {
    safeCall(instance, 'componentDidUpdate', void 0, elm);
    endPostUpdate();
  }
  {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (hostRef.$flags$ & 512 /* needsRerender */) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= -517;
  }
};
var appDidLoad = who => {
  nextTick(() => emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }));
};
var safeCall = (instance, method, arg, elm) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e, elm);
    }
  }
  return void 0;
};
var addHydratedFlag = elm => {
  var _a;
  return elm.classList.add((_a = BUILD.hydratedSelectorName) != null ? _a : 'hydrated');
};

// src/runtime/set-value.ts
var getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
var setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  const elm = ref;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = elm;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0], !!((cmpMeta.$flags$ & 64) /* formAssociated */));
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if (didValueChange) {
    hostRef.$instanceValues$.set(propName, newVal);
    {
      if (cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
        const watchMethods = cmpMeta.$watchers$[propName];
        if (watchMethods) {
          watchMethods.map(watchMethodName => {
            try {
              instance[watchMethodName](newVal, oldVal, propName);
            } catch (e) {
              consoleError(e, elm);
            }
          });
        }
      }
      if ((flags & (2 /* hasRendered */ | 16) /* isQueuedForUpdate */) === 2 /* hasRendered */) {
        if (instance.componentShouldUpdate) {
          if (instance.componentShouldUpdate(newVal, oldVal, propName) === false) {
            return;
          }
        }
        scheduleUpdate(hostRef, false);
      }
    }
  }
};

// src/runtime/proxy-component.ts
var proxyComponent = (Cstr, cmpMeta, flags) => {
  var _a, _b;
  const prototype = Cstr.prototype;
  if (cmpMeta.$flags$ & 64 /* formAssociated */ && flags & 1 /* isElementConstructor */) {
    FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS.forEach(cbName => {
      const originalFormAssociatedCallback = prototype[cbName];
      Object.defineProperty(prototype, cbName, {
        value(...args) {
          const hostRef = getHostRef(this);
          const instance = this;
          if (!instance) {
            hostRef.$onReadyPromise$.then(asyncInstance => {
              const cb = asyncInstance[cbName];
              typeof cb === 'function' && cb.call(asyncInstance, ...args);
            });
          } else {
            const cb = originalFormAssociatedCallback;
            typeof cb === 'function' && cb.call(instance, ...args);
          }
        },
      });
    });
  }
  if (cmpMeta.$members$ || cmpMeta.$watchers$ || Cstr.watchers) {
    if (Cstr.watchers && !cmpMeta.$watchers$) {
      cmpMeta.$watchers$ = Cstr.watchers;
    }
    const members = Object.entries((_a = cmpMeta.$members$) != null ? _a : {});
    members.map(([memberName, [memberFlags]]) => {
      if (memberFlags & 31 /* Prop */ || memberFlags & 32 /* State */) {
        const { get: origGetter, set: origSetter } = Object.getOwnPropertyDescriptor(prototype, memberName) || {};
        if (origGetter) cmpMeta.$members$[memberName][0] |= 2048 /* Getter */;
        if (origSetter) cmpMeta.$members$[memberName][0] |= 4096 /* Setter */;
        {
          Object.defineProperty(prototype, memberName, {
            get() {
              {
                return origGetter ? origGetter.apply(this) : getValue(this, memberName);
              }
            },
            configurable: true,
            enumerable: true,
          });
        }
        Object.defineProperty(prototype, memberName, {
          set(newValue) {
            const ref = getHostRef(this);
            if (origSetter) {
              const currentValue = memberFlags & 32 /* State */ ? this[memberName] : ref.$hostElement$[memberName];
              if (typeof currentValue === 'undefined' && ref.$instanceValues$.get(memberName)) {
                newValue = ref.$instanceValues$.get(memberName);
              } else if (!ref.$instanceValues$.get(memberName) && currentValue) {
                ref.$instanceValues$.set(memberName, currentValue);
              }
              origSetter.apply(this, [parsePropertyValue(newValue, memberFlags, !!((cmpMeta.$flags$ & 64) /* formAssociated */))]);
              newValue = memberFlags & 32 /* State */ ? this[memberName] : ref.$hostElement$[memberName];
              setValue(this, memberName, newValue, cmpMeta);
              return;
            }
            {
              setValue(this, memberName, newValue, cmpMeta);
              return;
            }
          },
        });
      }
    });
    {
      const attrNameToPropName = /* @__PURE__ */ new Map();
      prototype.attributeChangedCallback = function (attrName, oldValue, newValue) {
        plt.jmp(() => {
          var _a2;
          const propName = attrNameToPropName.get(attrName);
          if (this.hasOwnProperty(propName) && BUILD.lazyLoad);
          else if (
            prototype.hasOwnProperty(propName) &&
            typeof this[propName] === 'number' && // cast type to number to avoid TS compiler issues
            this[propName] == newValue
          ) {
            return;
          } else if (propName == null) {
            const hostRef = getHostRef(this);
            const flags2 = hostRef == null ? void 0 : hostRef.$flags$;
            if (flags2 && !((flags2 & 8) /* isConstructingInstance */) && flags2 & 128 /* isWatchReady */ && newValue !== oldValue) {
              const elm = this;
              const instance = elm;
              const entry = (_a2 = cmpMeta.$watchers$) == null ? void 0 : _a2[attrName];
              entry == null
                ? void 0
                : entry.forEach(callbackName => {
                    if (instance[callbackName] != null) {
                      instance[callbackName].call(instance, newValue, oldValue, attrName);
                    }
                  });
            }
            return;
          }
          const propDesc = Object.getOwnPropertyDescriptor(prototype, propName);
          newValue = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
          if (newValue !== this[propName] && (!propDesc.get || !!propDesc.set)) {
            this[propName] = newValue;
          }
        });
      };
      Cstr.observedAttributes = Array.from(
        /* @__PURE__ */ new Set([
          ...Object.keys((_b = cmpMeta.$watchers$) != null ? _b : {}),
          ...members
            .filter(([_, m]) => m[0] & 15 /* HasAttribute */)
            .map(([propName, m]) => {
              var _a2;
              const attrName = m[1] || propName;
              attrNameToPropName.set(attrName, propName);
              if (m[0] & 512 /* ReflectAttr */) {
                (_a2 = cmpMeta.$attrsToReflect$) == null ? void 0 : _a2.push([propName, attrName]);
              }
              return attrName;
            }),
        ]),
      );
    }
  }
  return Cstr;
};

// src/runtime/initialize-component.ts
var initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId) => {
  let Cstr;
  if ((hostRef.$flags$ & 32) /* hasInitializedComponent */ === 0) {
    hostRef.$flags$ |= 32 /* hasInitializedComponent */;
    {
      Cstr = elm.constructor;
      const cmpTag = elm.localName;
      customElements.whenDefined(cmpTag).then(() => (hostRef.$flags$ |= 128) /* isWatchReady */);
    }
    if (Cstr && Cstr.style) {
      let style;
      if (typeof Cstr.style === 'string') {
        style = Cstr.style;
      }
      const scopeId2 = getScopeId(cmpMeta);
      if (!styles.has(scopeId2)) {
        const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
        registerStyle(scopeId2, style, !!((cmpMeta.$flags$ & 1) /* shadowDomEncapsulation */));
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (ancestorComponent && ancestorComponent['s-rc']) {
    ancestorComponent['s-rc'].push(schedule);
  } else {
    schedule();
  }
};
var fireConnectedCallback = (instance, elm) => {};

// src/runtime/connected-callback.ts
var connectedCallback = elm => {
  if ((plt.$flags$ & 1) /* isTmpDisconnected */ === 0) {
    const hostRef = getHostRef(elm);
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
    if (!((hostRef.$flags$ & 1) /* hasConnected */)) {
      hostRef.$flags$ |= 1 /* hasConnected */;
      {
        if (
          // TODO(STENCIL-854): Remove code related to legacy shadowDomShim field
          cmpMeta.$flags$ &
          (4 /* hasSlotRelocation */ | 8) /* needsShadowDomShim */
        ) {
          setContentReference(elm);
        }
      }
      {
        let ancestorComponent = elm;
        while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
          if (ancestorComponent['s-p']) {
            attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent));
            break;
          }
        }
      }
      if (cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      if (BUILD.initializeNextTick) {
        nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
      } else {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    } else {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
      if (hostRef == null ? void 0 : hostRef.$lazyInstance$);
      else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
        hostRef.$onReadyPromise$.then(() => fireConnectedCallback());
      }
    }
    endConnected();
  }
};
var setContentReference = elm => {
  if (!win.document) {
    return;
  }
  const contentRefElm = (elm['s-cr'] = win.document.createComment(''));
  contentRefElm['s-cn'] = true;
  insertBefore(elm, contentRefElm, elm.firstChild);
};
var disconnectedCallback = async elm => {
  if ((plt.$flags$ & 1) /* isTmpDisconnected */ === 0) {
    const hostRef = getHostRef(elm);
    {
      if (hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map(rmListener => rmListener());
        hostRef.$rmListeners$ = void 0;
      }
    }
  }
  if (rootAppliedStyles.has(elm)) {
    rootAppliedStyles.delete(elm);
  }
  if (elm.shadowRoot && rootAppliedStyles.has(elm.shadowRoot)) {
    rootAppliedStyles.delete(elm.shadowRoot);
  }
};
var proxyCustomElement = (Cstr, compactMeta) => {
  const cmpMeta = {
    $flags$: compactMeta[0],
    $tagName$: compactMeta[1],
  };
  {
    cmpMeta.$members$ = compactMeta[2];
  }
  {
    cmpMeta.$listeners$ = compactMeta[3];
  }
  {
    cmpMeta.$watchers$ = Cstr.$watchers$;
  }
  {
    cmpMeta.$attrsToReflect$ = [];
  }
  {
    {
      patchCloneNode(Cstr.prototype);
    }
  }
  const originalConnectedCallback = Cstr.prototype.connectedCallback;
  const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
  Object.assign(Cstr.prototype, {
    __hasHostListenerAttached: false,
    __registerHost() {
      registerHost(this, cmpMeta);
    },
    connectedCallback() {
      if (!this.__hasHostListenerAttached) {
        const hostRef = getHostRef(this);
        addHostEventListeners(this, hostRef, cmpMeta.$listeners$);
        this.__hasHostListenerAttached = true;
      }
      connectedCallback(this);
      if (originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    },
    disconnectedCallback() {
      disconnectedCallback(this);
      if (originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    },
    __attachShadow() {
      {
        if (!this.shadowRoot) {
          createShadowRoot.call(this, cmpMeta);
        } else {
          if (this.shadowRoot.mode !== 'open') {
            throw new Error(`Unable to re-use existing shadow root for ${cmpMeta.$tagName$}! Mode is set to ${this.shadowRoot.mode} but Stencil only supports open shadow roots.`);
          }
        }
      }
    },
  });
  Cstr.is = cmpMeta.$tagName$;
  return proxyComponent(Cstr, cmpMeta, 1 /* isElementConstructor */ | 2 /* proxyState */);
};

// src/runtime/fragment.ts
var Fragment = (_, children) => children;
var addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
  if (listeners && win.document) {
    listeners.map(([flags, name, method]) => {
      const target = getHostListenerTarget(win.document, elm, flags);
      const handler = hostListenerProxy(hostRef, method);
      const opts = hostListenerOpts(flags);
      plt.ael(target, name, handler, opts);
      (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
    });
  }
};
var hostListenerProxy = (hostRef, methodName) => ev => {
  try {
    {
      hostRef.$hostElement$[methodName](ev);
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
};
var getHostListenerTarget = (doc, elm, flags) => {
  if (flags & 8 /* TargetWindow */) {
    return win;
  }
  return elm;
};
var hostListenerOpts = flags =>
  supportsListenerOptions
    ? {
        passive: (flags & 1) /* Passive */ !== 0,
        capture: (flags & 2) /* Capture */ !== 0,
      }
    : (flags & 2) /* Capture */ !== 0;

// src/runtime/nonce.ts
var setNonce = nonce => (plt.$nonce$ = nonce);

// src/runtime/platform-options.ts
var setPlatformOptions = opts => Object.assign(plt, opts);

// src/runtime/render.ts
function render(vnode, container) {
  const cmpMeta = {
    $flags$: 0,
    $tagName$: container.tagName,
  };
  const ref = {
    $cmpMeta$: cmpMeta,
    $hostElement$: container,
  };
  renderVdom(ref, vnode);
}

export { Fragment as F, H, setNonce as a, setPlatformOptions as b, createEvent as c, Host as d, getAssetPath as g, h, proxyCustomElement as p, render as r, setAssetPath as s };
//# sourceMappingURL=p-F5eU3Bfi.js.map

//# sourceMappingURL=p-F5eU3Bfi.js.map
