### API Documentation:

-   [DOCUMENTATION](http://fordevs.herokuapp.com/api-docs/#/)

### Notes:

-   Receive an Complex Object as params instead of primitive types
-   To decouple a Classes, create an interface and inject it.
-   Implement Factories to keep class instanciation centralized
-   Testing Practices:
    -   SUT: System Under Test
    -   MockFunction: It's used for testing INPUT values
    -   StubFunction: It's used for testing OUTPUT values
    -   SpyFunction: It's used for testing INPUT and OUTPUT values.
-   Make imports more readable
    -   TypeScript: add attribute "_paths_" into "_tsconfig.json_"
    -   Jest: add attribute "_moduleNameMapper_" into "_jest.config.js_"
    -   Create "_index.ts_" files to export data located in shared folders
