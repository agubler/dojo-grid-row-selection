import renderer, { tsx, create } from "@dojo/framework/core/vdom";
import dojo from "@dojo/themes/dojo";
import "@dojo/themes/dojo/index.css";

import Grid from "@dojo/widgets/grid";
import icache from "@dojo/framework/core/middleware/icache";
import { createFetcher } from "@dojo/widgets/grid/utils";
import { createData } from "./data";

const columnConfig = [
  {
    id: "id",
    title: "ID"
  },
  {
    id: "firstName",
    title: "First Name"
  },
  {
    id: "middleName",
    title: "Middle Name"
  },
  {
    id: "lastName",
    title: "Last Name"
  },
  {
    id: "otherName",
    title: "Other Name"
  }
];

const fetcher = createFetcher(createData());
const factory = create({ icache });

const Example = factory(function Example({ middleware: { icache } }) {
  const selected = icache.get<any[]>("selected");
  return (
    <virtual>
      <Grid
        theme={dojo}
        onRowSelect={items => {
          icache.set("selected", items);
        }}
        fetcher={fetcher}
        columnConfig={columnConfig}
        height={500}
      />
      {selected && (
        <div>
          {selected.map(item => (
            <pre key={item.id}>{JSON.stringify(item, null, 4)}</pre>
          ))}
        </div>
      )}
    </virtual>
  );
});

const r = renderer(() => <Example />);
r.mount();
