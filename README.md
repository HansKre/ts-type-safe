<h1>ts-type-safe</h1>

<p>Usefuly utility functions and types for a more type-safe TypeScript</p>

![view on npm](https://img.shields.io/npm/v/ts-type-safe) ![NPM](https://img.shields.io/npm/l/ts-type-safe)


## Modules

<dl>
<dt><a href="#module_types">types</a></dt>
<dd><p>Helper types to improve type-safety.</p></dd>
<dt><a href="#module_classNames">classNames</a></dt>
<dd><p>Helper function to simplify type-safe interaction with classNames.</p></dd>
<dt><a href="#module_validators">validators</a></dt>
<dd><p>Validators to improve type-safety.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#isMathematicalNumber">isMathematicalNumber()</a></dt>
<dd><p>consider mathematical number if:</p>
<ul>
<li>typeof number</li>
<li>can parse to int without need to remove anything (i.e. leading zeroes)</li>
<li>can parse to float without need to remove anything</li>
</ul></dd>
</dl>

<a name="module_types"></a>

## types
<p>Helper types to improve type-safety.</p>


* [types](#module_types)
    * [~Prettify<T>](#module_types..Prettify<T>) : <code>Prettify</code>
    * [~ValuesOf<T>](#module_types..ValuesOf<T>) : <code>ValuesOf</code>
    * [~KeysOf<T>](#module_types..KeysOf<T>) : <code>KeysOf</code>
    * [~PrefixedKeys<T,](#module_types..PrefixedKeys<T,) : <code>PrefixedKeys</code>

<a name="module_types..Prettify<T>"></a>

### types~Prettify<T> : <code>Prettify</code>
<p>Helper type to show all properties of a complex base-type</p>

**Kind**: inner typedef of [<code>types</code>](#module_types)  
<a name="module_types..ValuesOf<T>"></a>

### types~ValuesOf<T> : <code>ValuesOf</code>
<p>Helper type to generate values of a given type</p>
<p>NOTE: not for enum-types!</p>
<p>To create values of an enum-type, use:</p>
<pre class="prettyprint source"><code>type EnumVals = `${EnumType}`;
</code></pre>

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
<p>Helper type to generate keys of a given type</p>

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Example**  
```js
const Foo = { A: "a", B: "b"};
type FooKeys = KeysOf<typeof Foo>;
// type FooKeys = "A" | "B"

// equivalent to: type FooKeys = keyof typeof Foo;
```
<a name="module_types..PrefixedKeys<T,"></a>

### types~PrefixedKeys<T, : <code>PrefixedKeys</code>
<p>Helper type to generate prefixed keys of a given type</p>

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Example**  
```js
const Foo = { A: "a", B: "b"};
type FooType = typeof Foo;
// type FooType = { "A": string; "B": string; }

type PrefixedFooKeys = PrefixedKeys<typeof Foo, 'foo.'>;
// type PrefixedFooKeys = { "foo.A": string; "foo.B": string; }
```
<a name="module_classNames"></a>

## classNames
<p>Helper function to simplify type-safe interaction with classNames.</p>

<a name="module_classNames..classNames"></a>

### classNames~classNames(...names)
<p>Joins classes and avoids complicated checks and usage of nasty string-literals.</p>
<p><em>note: exported also as <code>cns</code>-shorthand</em></p>

**Kind**: inner method of [<code>classNames</code>](#module_classNames)  

| Param | Description |
| --- | --- |
| ...names | <p>Array of <code>string</code>, <code>undefined</code> or <code>false</code></p> |

**Example**  
```js
<div className={cns('primary', !isValid && 'disabled')} />
```
<a name="module_validators"></a>

## validators
<p>Validators to improve type-safety.</p>


* [validators](#module_validators)
    * [~isObject(value)](#module_validators..isObject)
    * [~isDefined(value)](#module_validators..isDefined)
    * [~hasOwnProperty(obj, propKey)](#module_validators..hasOwnProperty)
    * [~hasOwnProperties(obj, propKeys)](#module_validators..hasOwnProperties)
    * [~isNonEmptyArray(obj)](#module_validators..isNonEmptyArray)
    * [~isEmptyArray(obj)](#module_validators..isEmptyArray)
    * [~isEnumKey(enumType, value)](#module_validators..isEnumKey)
    * [~isEnumValue(enumType, value)](#module_validators..isEnumValue)

<a name="module_validators..isObject"></a>

### validators~isObject(value)
<p>Checks if value is not <code>null</code> and of <code>object</code>-type.</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| value | <p>to check</p> |

<a name="module_validators..isDefined"></a>

### validators~isDefined(value)
<p>Returns <code>true</code> if value is not <code>undefined</code> and not <code>null</code>.</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| value | <p>to check</p> |

<a name="module_validators..hasOwnProperty"></a>

### validators~hasOwnProperty(obj, propKey)
<p>Checks existence of @propKey on an object and retypes the <code>@obj</code> as an object having that property of <code>unknown</code>-type.</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| obj | <p>to check</p> |
| propKey | <p>which may or may not exist on the <code>obj</code></p> |

<a name="module_validators..hasOwnProperties"></a>

### validators~hasOwnProperties(obj, propKeys)
<p>Checks existence of @propKeys on an object and retypes the <code>@obj</code> as an object having these properties, all of which of <code>unknown</code>-type.</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| obj | <p>to check</p> |
| propKeys | <p>list of <code>@propKeys</code> which may or may not exist on the <code>obj</code></p> |

<a name="module_validators..isNonEmptyArray"></a>

### validators~isNonEmptyArray(obj)
<p>Checks if @obj is an array with at least one entry.</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| obj | <p>to check</p> |

<a name="module_validators..isEmptyArray"></a>

### validators~isEmptyArray(obj)
<p>Checks if @obj is an array with zero entries.</p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| obj | <p>to check</p> |

<a name="module_validators..isEnumKey"></a>

### validators~isEnumKey(enumType, value)
<p>Typeguard for enums-keys</p>
<p><em>note: not for number-enums</em></p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| enumType | <p>the type to check against</p> |
| value | <p>some value to check if it is a key of the given <code>@enumType</code></p> |

**Example**  
```js
enum MyEnum {
 Thing1 = 'thing one',
 Thing2 = 'thing two',
}

function onlyKeys(key: keyof typeof MyEnum) {
  console.log(key, MyEnum[key]);
}

const testStr = "Thing2";

if (isEnumKey(MyEnum, testStr)) {
  // compiler knows that testStr is of type `keyof typeof MyEnum`
  onlyKeys(testStr);
}
```
<a name="module_validators..isEnumValue"></a>

### validators~isEnumValue(enumType, value)
<p>Typeguard for enum values</p>
<p><em>note: not for number-enums</em></p>

**Kind**: inner method of [<code>validators</code>](#module_validators)  

| Param | Description |
| --- | --- |
| enumType | <p>the type to check against</p> |
| value | <p>some value to check if it is a value of the given <code>@enumType</code></p> |

**Example**  
```js
enum MyEnum {
 Thing1 = 'thing one',
 Thing2 = 'thing two',
}

function onlyVals(val: MyEnum) {
  console.log("onlyVals", val);
}

const testStr = "thing two";

if (isEnumValue(MyEnum, testStr)) {
  // compiler knows that testStr is of type `MyEnum`
  onlyVals(testStr);
}
```
<a name="isMathematicalNumber"></a>

## isMathematicalNumber()
<p>consider mathematical number if:</p>
<ul>
<li>typeof number</li>
<li>can parse to int without need to remove anything (i.e. leading zeroes)</li>
<li>can parse to float without need to remove anything</li>
</ul>

**Kind**: global function  


* * *

&copy; 2023 Hans Krebs