/*eslint @typescript-eslint/no-unused-vars: ["off", {"varsIgnorePattern": "^_"}]*/
import React from "react";
import merge from "lodash/merge";
import {
  Utils, BasicConfig,
  MuiConfig,
  // types:
  Settings, Operators, Widgets, Fields, Config, Types, Conjunctions, LocaleSettings, Funcs,
} from "@react-awesome-query-builder/mui";
import { ruRU } from "@mui/material/locale";
import "@react-awesome-query-builder/mui/css/styles.scss";
const InitialConfig = MuiConfig;

const { simulateAsyncFetch } = Utils.Autocomplete;

const demoListValues = [
  { title: "A", value: "a" },
  { title: "AA", value: "aa" },
  { title: "AAA1", value: "aaa1" },
  { title: "AAA2", value: "aaa2" },
  { title: "B", value: "b" },
  { title: "C", value: "c" },
  { title: "D", value: "d" },
  { title: "E", value: "e" },
  { title: "F", value: "f" },
  { title: "G", value: "g" },
  { title: "H", value: "h" },
  { title: "I", value: "i" },
  { title: "J", value: "j" },
];
const simulatedAsyncFetch = simulateAsyncFetch(demoListValues, 3);


//////////////////////////////////////////////////////////////////////

const fields: Fields = {
  user: {
    label: "User",
    tooltip: "Group of fields",
    type: "!struct",
    subfields: {
      firstName: {
        label2: "Username", //only for menu's toggler
        type: "text",
        excludeOperators: ["proximity"],
        mainWidgetProps: {
          valueLabel: "Name",
          valuePlaceholder: "Enter name",
        },
        fieldSettings: {
          validateValue: (val: string, fieldSettings) => {
            return (val.length < 10);
          },
        },
      },
      login: {
        type: "text",
        excludeOperators: ["proximity"],
        fieldSettings: {
          validateValue: (val: string, fieldSettings) => {
            return (val.length < 10 && (val === "" || val.match(/^[A-Za-z0-9_-]+$/) !== null));
          },
        },
        mainWidgetProps: {
          valueLabel: "Login",
          valuePlaceholder: "Enter login",
        },
      }
    }
  },
  num: {
    label: "Number",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: -1,
      max: 5
    },
  },
  slider: {
    label: "Slider",
    type: "number",
    preferWidgets: ["slider", "rangeslider"],
    valueSources: ["value", "field"],
    fieldSettings: {
      min: 0,
      max: 100,
      step: 1,
      marks: {
        0: <strong>0%</strong>,
        100: <strong>100%</strong>
      },
    },
    //overrides
    widgets: {
      slider: {
        widgetProps: {
          valuePlaceholder: "..Slider",
        }
      }
    },
  },
  date: {
    label: "Date",
    type: "date",
    valueSources: ["value"],
  },
  time: {
    label: "Time",
    type: "time",
    valueSources: ["value"],
    operators: ["greater_or_equal", "less_or_equal", "between"],
    defaultOperator: "between",
  },
  datetime: {
    label: "DateTime",
    type: "datetime",
    valueSources: ["value"]
  },
  datetime2: {
    label: "DateTime2",
    type: "datetime",
    valueSources: ["field"]
  },
  color: {
    label: "Color",
    type: "select",
    valueSources: ["value"],
    fieldSettings: {
      listValues: [
        { value: "yellow", title: "Yellow" },
        { value: "green", title: "Green" },
        { value: "orange", title: "Orange" }
      ],
    }
  },
  color2: {
    label: "Color2",
    type: "select",
    fieldSettings: {
      listValues: {
        yellow: "Yellow",
        green: "Green",
        orange: "Orange",
        purple: "Purple"
      },
    }
  },
  multicolor: {
    label: "Colors",
    type: "multiselect",
    fieldSettings: {
      listValues: {
        yellow: "Yellow",
        green: "Green",
        orange: "Orange"
      },
      allowCustomValues: true
    },
  },
  selecttree: {
    label: "Color (tree)",
    type: "treeselect",
    fieldSettings: {
      treeExpandAll: true,
      treeValues: [
        {
          value: "1", title: "Warm colors", children: [
            { value: "2", title: "Red" },
            { value: "3", title: "Orange" }
          ]
        },
        {
          value: "4", title: "Cool colors", children: [
            { value: "5", title: "Green" },
            {
              value: "6", title: "Blue", children: [
                {
                  value: "7", title: "Sub blue", children: [
                    { value: "8", title: "Sub sub blue and a long text" }
                  ]
                }
              ]
            }
          ]
        }
      ],
    }
  },
  multiselecttree: {
    label: "Colors (tree)",
    type: "treemultiselect",
    fieldSettings: {
      treeExpandAll: true,
      treeValues: [
        {
          value: "1", title: "Warm colors", children: [
            { value: "2", title: "Red" },
            { value: "3", title: "Orange" }
          ]
        },
        {
          value: "4", title: "Cool colors", children: [
            { value: "5", title: "Green" },
            {
              value: "6", title: "Blue", children: [
                {
                  value: "7", title: "Sub blue", children: [
                    { value: "8", title: "Sub sub blue and a long text" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  stock: {
    label: "In stock",
    type: "boolean",
    defaultValue: true,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  autocomplete: {
    label: "Autocomplete",
    type: "select",
    valueSources: ["value"],
    fieldSettings: {
      asyncFetch: simulatedAsyncFetch,
      useAsyncSearch: true,
      useLoadMore: true,
      forceAsyncSearch: false,
      allowCustomValues: false
    },
  },
  autocompleteMultiple: {
    label: "AutocompleteMultiple",
    type: "multiselect",
    valueSources: ["value"],
    fieldSettings: {
      asyncFetch: simulatedAsyncFetch,
      useAsyncSearch: true,
      useLoadMore: true,
      forceAsyncSearch: false,
      allowCustomValues: false
    },
  },
};


//////////////////////////////////////////////////////////////////////

const conjunctions: Conjunctions = {
  AND: InitialConfig.conjunctions.AND,
  OR: InitialConfig.conjunctions.OR,
};

const operators: Operators = {
  ...InitialConfig.operators,
  // examples of  overriding
  between: {
    ...InitialConfig.operators.between,
    textSeparators: [
      "from",
      "to"
    ],
  },
};

const widgets: Widgets = {
  ...InitialConfig.widgets,
  // examples of  overriding
  slider: {
    ...InitialConfig.widgets.slider,
    customProps: {
      width: "300px"
    }
  },
  rangeslider: {
    ...InitialConfig.widgets.rangeslider,
    customProps: {
      width: "300px"
    }
  },
  date: {
    ...InitialConfig.widgets.date,
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD",
  },
  time: {
    ...InitialConfig.widgets.time,
    timeFormat: "HH:mm",
    valueFormat: "HH:mm:ss",
  },
  datetime: {
    ...InitialConfig.widgets.datetime,
    timeFormat: "HH:mm",
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  treeselect: {
    ...InitialConfig.widgets.treeselect,
    customProps: {
      showSearch: true
    }
  },
};


const types: Types = {
  ...InitialConfig.types,
  // examples of  overriding
  boolean: merge(InitialConfig.types.boolean, {
    widgets: {
      boolean: {
        widgetProps: {
          hideOperator: true,
          operatorInlineLabel: "is",
        }
      },
    },
  }),
};


const localeSettings: LocaleSettings = {
  locale: {
    moment: "ru",
    mui: ruRU,
  },
  valueLabel: "Value",
  valuePlaceholder: "Value",
  fieldLabel: "Field",
  operatorLabel: "Operator",
  fieldPlaceholder: "Select field",
  operatorPlaceholder: "Select operator",
  deleteLabel: null,
  addGroupLabel: "Add group",
  addRuleLabel: "Add rule",
  addSubRuleLabel: "Add sub rule",
  delGroupLabel: null,
  notLabel: "Not",
  valueSourcesPopupTitle: "Select value source",
  removeRuleConfirmOptions: {
    title: "Are you sure delete this rule?",
    okText: "Yes",
    okType: "danger",
  },
  removeGroupConfirmOptions: {
    title: "Are you sure delete this group?",
    okText: "Yes",
    okType: "danger",
  },
};

const settings: Settings = {
  ...InitialConfig.settings,
  ...localeSettings,

  valueSourcesInfo: {
    value: {
      label: "Value"
    },
    field: {
      label: "Field",
      widget: "field",
    },
    func: {
      label: "Function",
      widget: "func",
    }
  },
  // canReorder: false,
  // canRegroup: false,
  // showNot: false,
  // showLabels: true,
  maxNesting: 3,
  canLeaveEmptyGroup: true, //after deletion

};

const funcs: Funcs = {};



const config: Config = {
  conjunctions,
  operators,
  widgets,
  types,
  settings,
  fields,
  funcs
};

export default config;

