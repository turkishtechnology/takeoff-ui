import { TkTooltip, TkCard, TkButton } from '@takeoff-ui/react';
function Tooltip() {
  return (
    <TkCard>
      <div slot="header">
        <h1 className="p-3 text-3xl font-semibold text-slate-500">
          Tooltip Examples
        </h1>
      </div>
      <div className="flex flex-col gap-5 overflow-auto">
        <TkTooltip
          icon={'flight'}
          header="Default Header"
          description="Default Description"
          variant="dark"
        >
          <TkButton label="Default Example" slot="trigger"></TkButton>
        </TkTooltip>
        <TkTooltip
          header="Example"
          description="Default Description"
          variant="dark"
        >
          <TkButton label="Custom Content Example" slot="trigger"></TkButton>
          <div className="flex flex-col w-52 h-52 gap-5" slot="content">
            <h1 className="text-2xl">Custom Header</h1>
            <div className="h-32 p-5 bg-red-100/10 rounded-xl">
              <p>Custom content.</p>
            </div>
          </div>
        </TkTooltip>
      </div>
    </TkCard>
  );
}

export default Tooltip;
