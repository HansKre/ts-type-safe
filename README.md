<h1>ts-type-safe</h1>

<p>Utilities and types for a more type-safe TypeScript</p>

[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.com/package/ts-type-safe)

## Modules

<dl>
<dt><a href="#module_types">types</a></dt>
<dd><p>Helper types to improve type-safety.</p></dd>
<dt><a href="#module_classNames">classNames</a></dt>
<dd><p>Helper function to simplify type-safe work with classNames.</p></dd>
<dt><a href="#module_validators">validators</a></dt>
<dd><p>Validators to improve type-safety.</p></dd>
</dl>

<a name="module_types"></a>

## types
<p>Helper types to improve type-safety.</p>


* [types](#module_types)
    * [~Prettify<T>](#module_types..Prettify<T>) : <code>Prettify</code>
    * [~ValuesOf<T>](#module_types..ValuesOf<T>) : <code>ValuesOf</code>
    * [~KeysOf<T>](#module_types..KeysOf<T>) : <code>KeysOf</code>

<a name="module_types..Prettify<T>"></a>

### types~Prettify<T> : <code>Prettify</code>
<p><strong>Helper type to show all properties of a complex base-type</strong></p>

**Kind**: inner typedef of [<code>types</code>](#module_types)  
<a name="module_types..ValuesOf<T>"></a>

### types~ValuesOf<T> : <code>ValuesOf</code>
<p><strong>Helper type generates values of a given type</strong></p>
<p>NOTE: not for enum-types!
Use type EnumVals = `${EnumType}`; to create values of an enum-type</p>

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Example**  
```js
const Foo = { A: "a", B: "b"} as const;
type FooVals = ValuesOf<typeof Foo>;
// type FooVals = "a" | "b"

// equivalent to: type FooVals = (typeof Foo)[keyof typeof Foo];
```
<a name="module_types..KeysOf<T>"></a>

### types~KeysOf<T> : <code>KeysOf</code>
<p><strong>Helper type generates keys of a given type</strong></p>

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Example**  
```js
const Foo = { A: "a", B: "b"};
type FooKeys = KeysOf<typeof Foo>;
// type FooKeys = "A" | "B"

// equivalent to: type FooKeys = keyof typeof Foo;
```
<a name="module_classNames"></a>

## classNames
<p>Helper function to simplify type-safe work with classNames.</p>

<a name="module_classNames..classNames"></a>

### classNames~classNames()
<p>Helper-Function to join multiple classes and to avoid usage of nasty string-literals</p>

**Kind**: inner method of [<code>classNames</code>](#module_classNames)  
<a name="module_validators"></a>

## validators
<p>Validators to improve type-safety.</p>


* [validators](#module_validators)
    * [~hasOwnProperty()](#module_validators..hasOwnProperty)
    * [~isEnumKey()](#module_validators..isEnumKey)
    * [~isEnumValueGenerator()](#module_validators..isEnumValueGenerator)
    * [~isEnumValue(enumType, value)](#module_validators..isEnumValue)

<a name="module_validators..hasOwnProperty"></a>

### validators~hasOwnProperty()
<p>Checks existence of @propKey on an object and retypes the @obj</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  
<a name="module_validators..isEnumKey"></a>

### validators~isEnumKey()
<p><strong>Typeguard for enums-keys</strong></p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  
**Example**  
```js
enum MyEnum {
 Thing1 = 'thing one',
 Thing2 = 'thing two',
}

function testKeys(key: keyof typeof MyEnum) {
  console.log(key, MyEnum[key]);
}

const testStr = "Thing2";

if (isEnumKey(MyEnum, testStr)) {
  // compiler knows that testStr is of type `keyof typeof MyEnum`
  testKeys(testStr);
}
```
<a name="module_validators..isEnumValueGenerator"></a>

### validators~isEnumValueGenerator()
<p>https://stackoverflow.com/questions/58278652/generic-enum-type-guard</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  
<a name="module_validators..isEnumValue"></a>

### validators~isEnumValue(enumType, value)
<p><strong>Typeguard for enum values</strong></p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  
**Todo:**: take care of number-Enums  

| Param |
| --- |
| enumType | 
| value | 

**Example**  
```js
enum MyEnum {
 Thing1 = 'thing one',
 Thing2 = 'thing two',
}

function testVals(val: MyEnum) {
  console.log("testVals", val);
}

const testStr = "thing two";

if (isEnumValue(MyEnum, testStr)) {
  // compiler knows that testStr is of type `MyEnum`
  testVals(testStr);
}
```

* * *

&copy; 2023 Hans Krebs