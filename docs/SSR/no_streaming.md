# Turning off SSR streaming 

This app uses SSR streaming that is **not supported** by jss library (material-ui uses jss).

If you want to **turn off** streaming follow the steps:

* **remove** streaming unnecessary code is below:

[src/server/index.js](../src/server/index.js)
```
    res.write(getHeader(helmet, bundles));

    const stream = sheet.interleaveWithNodeStream(
      renderToNodeStream(tree),
    );

    stream.pipe(res, { end: false });

    const sessionStore = appStore.sessionStore.toJs();
    stream.on('end', () => res.end(getFooter(apolloData, sessionStore)));
```
* **add** `JssProvider` (and `MuiThemeProvider` if you use material-ui). 

You can find providers in the same file as in the last step:

[src/server/index.js](../src/server/index.js)
```
    const tree = sheet.collectStyles(
      <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
        <MobXProvider appStore={appStore} {...appStore.getAllStores()}>
          <ApolloProvider client={client}>
            <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages}>
              <ThemeProvider theme={theme}>
                <StaticRouter context={context} location={req.url}>
                  <App />
                </StaticRouter>
              </ThemeProvider>
            </IntlProvider>
          </ApolloProvider>
        </MobXProvider>
      </Loadable.Capture>,
    );
```

* You need to **connect all data** in [src/server/html-template.js](../src/server/html-template.js): 
    * helmet and bundle data (it is already)
    * sheets
    * jss 
    * rendered to string React 
    * apollo state 
    * session store
* and **send** it to the client.

Example:
```
res.send(getHtmlTemplate(helmet, bundles, styledCss, sheetsRegistry.toString(), reactMarkup, apolloData, sessionStore));
```
In this example we rename `getHeader()` function to `getHtmlTemplate()` 
and remake that it gets all necessary data and returns all template 
as one string.

Sending code should be **at the same place** as streaming code that you 
have removed in the first step.

### If you need help

* [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html)
* [Server Rendering - Material-UI](https://material-ui.com/guides/server-rendering/)
* [Server Side Rendering - styled-components](https://www.styled-components.com/docs/advanced#server-side-rendering)
