export default function (plop) {
    // component generator
    plop.setGenerator("component", {
        description: "application global component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "component name please",
            },
        ],
        actions: [
            {
                type: "add",
                path: "app/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile: "app/templates/Component/Component.tsx.hbs",
            },
            {
                type: "add",
                path: "app/components/{{pascalCase name}}/index.ts",
                templateFile: "app/templates/Component/index.ts.hbs",
            },
            {
                type: "add",
                path: "app/components/{{pascalCase name}}/{{pascalCase name}}.module.css",
                templateFile:
                    "app/templates/Component/Component.module.css.hbs",
            },
        ],
    });
}
