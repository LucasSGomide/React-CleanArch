![JOB-STATUS](https://github.com/LucasSGomide/cleanArch_React/actions/workflows/github-action.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/LucasSGomide/React-CleanArch/badge.svg?branch=main)](https://coveralls.io/github/LucasSGomide/React-CleanArch?branch=main)

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
-   Implement "Adapter" design pattern to enforce external libraries to follow a defined interface
-   YAGNI principle ("You Aren't Gonna Need It"): features should only be added when required
-   Implement "Composite" design pattern to execute different kinds of field validations (Ex: Required Field, Min Length, Email, Phone Number, etc...) for a specific field name.
    -   Ex:
        -   Field: fullName
        -   Validations: RequiredField, MinLength
-   Implement "Builder" design pattern to "build" an array of validation methods
    -   Ex:
        -   Field: fullName
        -   Validations: RequiredField, MinLength
        -   builder.field('fullName').required().minLength(5)
