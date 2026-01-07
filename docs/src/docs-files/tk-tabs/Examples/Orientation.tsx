import React from 'react';
import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Orientation = () => {
  const reactCode = `<TkTabs orientation="horizontal">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Eiusmod nulla excepteur ex esse cupidatat quis minim proident et consequat eu. Officia ut sit aute anim aute. Culpa exercitation occaecat anim ad velit velit commodo. Eu est nostrud ad nulla. Ex ipsum irure proident ea incididunt. Proident occaecat veniam nulla pariatur nulla ullamco.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Reprehenderit est enim esse ut id velit enim. Anim labore dolor sint consectetur velit fugiat veniam aute in esse. Cupidatat voluptate eiusmod consequat dolore enim nostrud pariatur irure ipsum voluptate occaecat non. Voluptate mollit consectetur qui pariatur eu veniam consectetur.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Velit deserunt ut ullamco do excepteur consectetur sint eiusmod. Nisi do velit eiusmod exercitation excepteur laborum ex cillum culpa laboris voluptate. Elit duis elit incididunt ad excepteur consequat eiusmod sunt fugiat commodo exercitation aliqua cupidatat. Enim excepteur dolore qui irure velit excepteur ea occaecat dolor tempor eu ex ipsum tempor. Deserunt et velit incididunt ex velit elit labore minim.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs orientation="vertical">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Deserunt ad adipisicing do aliqua enim ut culpa qui ad ut tempor. Et elit veniam commodo aliquip nostrud incididunt laboris ex ad laboris non nostrud ea sunt. Aute qui reprehenderit ad est ad ipsum duis. Velit minim ipsum occaecat occaecat aliqua exercitation proident quis dolor enim mollit eiusmod esse. Exercitation magna laboris adipisicing consectetur veniam ex exercitation nisi laboris officia. Consectetur dolor dolor velit occaecat officia dolore occaecat aliquip laboris nisi irure voluptate. Ullamco anim magna est velit proident quis nulla ullamco fugiat.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Nulla cupidatat culpa irure dolore anim ut eiusmod incididunt. Ut Lorem anim eu esse fugiat aliqua quis anim adipisicing fugiat. Mollit reprehenderit irure cillum non ad sint non laborum sit deserunt.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Ad dolor excepteur consequat incididunt minim sit quis ipsum fugiat labore pariatur consectetur aliqua. Cupidatat eu exercitation et ex veniam adipisicing laboris eu dolor. Eiusmod deserunt laboris reprehenderit nulla anim enim. Est dolor consequat cillum consectetur. Consequat eiusmod adipisicing est amet incididunt duis eiusmod qui anim excepteur nisi aliquip.</p>
    </TkTabsItem>
  </TkTabs>`;

  const vueCode = `<TkTabs orientation="horizontal">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Eiusmod nulla excepteur ex esse cupidatat quis minim proident et consequat eu. Officia ut sit aute anim aute. Culpa exercitation occaecat anim ad velit velit commodo. Eu est nostrud ad nulla. Ex ipsum irure proident ea incididunt. Proident occaecat veniam nulla pariatur nulla ullamco.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Reprehenderit est enim esse ut id velit enim. Anim labore dolor sint consectetur velit fugiat veniam aute in esse. Cupidatat voluptate eiusmod consequat dolore enim nostrud pariatur irure ipsum voluptate occaecat non. Voluptate mollit consectetur qui pariatur eu veniam consectetur.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Velit deserunt ut ullamco do excepteur consectetur sint eiusmod. Nisi do velit eiusmod exercitation excepteur laborum ex cillum culpa laboris voluptate. Elit duis elit incididunt ad excepteur consequat eiusmod sunt fugiat commodo exercitation aliqua cupidatat. Enim excepteur dolore qui irure velit excepteur ea occaecat dolor tempor eu ex ipsum tempor. Deserunt et velit incididunt ex velit elit labore minim.</p>
    </TkTabsItem>
  </TkTabs>

  <TkTabs orientation="vertical">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Deserunt ad adipisicing do aliqua enim ut culpa qui ad ut tempor. Et elit veniam commodo aliquip nostrud incididunt laboris ex ad laboris non nostrud ea sunt. Aute qui reprehenderit ad est ad ipsum duis. Velit minim ipsum occaecat occaecat aliqua exercitation proident quis dolor enim mollit eiusmod esse. Exercitation magna laboris adipisicing consectetur veniam ex exercitation nisi laboris officia. Consectetur dolor dolor velit occaecat officia dolore occaecat aliquip laboris nisi irure voluptate. Ullamco anim magna est velit proident quis nulla ullamco fugiat.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Nulla cupidatat culpa irure dolore anim ut eiusmod incididunt. Ut Lorem anim eu esse fugiat aliqua quis anim adipisicing fugiat. Mollit reprehenderit irure cillum non ad sint non laborum sit deserunt.</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Ad dolor excepteur consequat incididunt minim sit quis ipsum fugiat labore pariatur consectetur aliqua. Cupidatat eu exercitation et ex veniam adipisicing laboris eu dolor. Eiusmod deserunt laboris reprehenderit nulla anim enim. Est dolor consequat cillum consectetur. Consequat eiusmod adipisicing est amet incididunt duis eiusmod qui anim excepteur nisi aliquip.</p>
    </TkTabsItem>
  </TkTabs>`;

  const angularCode = `<tk-tabs orientation="horizontal">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Eiusmod nulla excepteur ex esse cupidatat quis minim proident et consequat eu. Officia ut sit aute anim aute. Culpa exercitation occaecat anim ad velit velit commodo. Eu est nostrud ad nulla. Ex ipsum irure proident ea incididunt. Proident occaecat veniam nulla pariatur nulla ullamco.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Reprehenderit est enim esse ut id velit enim. Anim labore dolor sint consectetur velit fugiat veniam aute in esse. Cupidatat voluptate eiusmod consequat dolore enim nostrud pariatur irure ipsum voluptate occaecat non. Voluptate mollit consectetur qui pariatur eu veniam consectetur.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Velit deserunt ut ullamco do excepteur consectetur sint eiusmod. Nisi do velit eiusmod exercitation excepteur laborum ex cillum culpa laboris voluptate. Elit duis elit incididunt ad excepteur consequat eiusmod sunt fugiat commodo exercitation aliqua cupidatat. Enim excepteur dolore qui irure velit excepteur ea occaecat dolor tempor eu ex ipsum tempor. Deserunt et velit incididunt ex velit elit labore minim.</p>
    </tk-tabs-item>
  </tk-tabs>

  <tk-tabs orientation="vertical">
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Deserunt ad adipisicing do aliqua enim ut culpa qui ad ut tempor. Et elit veniam commodo aliquip nostrud incididunt laboris ex ad laboris non nostrud ea sunt. Aute qui reprehenderit ad est ad ipsum duis. Velit minim ipsum occaecat occaecat aliqua exercitation proident quis dolor enim mollit eiusmod esse. Exercitation magna laboris adipisicing consectetur veniam ex exercitation nisi laboris officia. Consectetur dolor dolor velit occaecat officia dolore occaecat aliquip laboris nisi irure voluptate. Ullamco anim magna est velit proident quis nulla ullamco fugiat.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Nulla cupidatat culpa irure dolore anim ut eiusmod incididunt. Ut Lorem anim eu esse fugiat aliqua quis anim adipisicing fugiat. Mollit reprehenderit irure cillum non ad sint non laborum sit deserunt.</p>
    </tk-tabs-item>
    <tk-tabs-item label="Tab label" icon="flight">
      <p>Ad dolor excepteur consequat incididunt minim sit quis ipsum fugiat labore pariatur consectetur aliqua. Cupidatat eu exercitation et ex veniam adipisicing laboris eu dolor. Eiusmod deserunt laboris reprehenderit nulla anim enim. Est dolor consequat cillum consectetur. Consequat eiusmod adipisicing est amet incididunt duis eiusmod qui anim excepteur nisi aliquip.</p>
    </tk-tabs-item>
  </tk-tabs>`;

  const demo = (
    <>
      <div>
        <h3>Horizontal</h3>
        <TkTabs
          orientation="horizontal"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">
              Eiusmod nulla excepteur ex esse cupidatat quis minim proident et consequat eu. Officia ut sit aute anim aute. Culpa exercitation occaecat anim ad velit velit commodo.
              Eu est nostrud ad nulla. Ex ipsum irure proident ea incididunt. Proident occaecat veniam nulla pariatur nulla ullamco.
            </p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">
              Reprehenderit est enim esse ut id velit enim. Anim labore dolor sint consectetur velit fugiat veniam aute in esse. Cupidatat voluptate eiusmod consequat dolore enim
              nostrud pariatur irure ipsum voluptate occaecat non. Voluptate mollit consectetur qui pariatur eu veniam consectetur.
            </p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">
              Velit deserunt ut ullamco do excepteur consectetur sint eiusmod. Nisi do velit eiusmod exercitation excepteur laborum ex cillum culpa laboris voluptate. Elit duis
              elit incididunt ad excepteur consequat eiusmod sunt fugiat commodo exercitation aliqua cupidatat. Enim excepteur dolore qui irure velit excepteur ea occaecat dolor
              tempor eu ex ipsum tempor. Deserunt et velit incididunt ex velit elit labore minim.
            </p>
          </TkTabsItem>
        </TkTabs>
      </div>
      <div>
        <h3>Vertical</h3>
        <TkTabs
          orientation="vertical"
          contentStyle={{
            color: 'var(--text-dark)',
            fontSize: 'var(--desktop-body-s-size)',
          }}
        >
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">
              Deserunt ad adipisicing do aliqua enim ut culpa qui ad ut tempor. Et elit veniam commodo aliquip nostrud incididunt laboris ex ad laboris non nostrud ea sunt. Aute
              qui reprehenderit ad est ad ipsum duis. Velit minim ipsum occaecat occaecat aliqua exercitation proident quis dolor enim mollit eiusmod esse. Exercitation magna
              laboris adipisicing consectetur veniam ex exercitation nisi laboris officia. Consectetur dolor dolor velit occaecat officia dolore occaecat aliquip laboris nisi irure
              voluptate. Ullamco anim magna est velit proident quis nulla ullamco fugiat.
            </p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">
              Nulla cupidatat culpa irure dolore anim ut eiusmod incididunt. Ut Lorem anim eu esse fugiat aliqua quis anim adipisicing fugiat. Mollit reprehenderit irure cillum non
              ad sint non laborum sit deserunt.
            </p>
          </TkTabsItem>
          <TkTabsItem label="Tab label" icon="flight">
            <p className="m-0">
              Ad dolor excepteur consequat incididunt minim sit quis ipsum fugiat labore pariatur consectetur aliqua. Cupidatat eu exercitation et ex veniam adipisicing laboris eu
              dolor. Eiusmod deserunt laboris reprehenderit nulla anim enim. Est dolor consequat cillum consectetur. Consequat eiusmod adipisicing est amet incididunt duis eiusmod
              qui anim excepteur nisi aliquip.
            </p>
          </TkTabsItem>
        </TkTabs>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default Orientation;
