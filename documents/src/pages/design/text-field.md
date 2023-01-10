<!--
type: template
name: text-field-design
-->

## Design

### Multiple Example in one `<code-sandbox>`

::

```javascript
::text-field::
const element = document.getElementById("nickname");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.textContent = "Nickname must be lowercase letters between 4-8 characters.";
  }
  else {
    errorChangedText.textContent = "";
  }
});
```

```css
.explainer {
  border: 2px dashed green;
}

#error-text {
  color:#d94255;
}
ef-text-field {
  width: 300px;
}
label {
  display: block;
}
```

```html
<p class="explainer">Validate input using pattern example</p>
<label for="nickname">Nickname</label>
<ef-text-field
  id="nickname"
  aria-describedby="error-text"
  pattern="[a-z]{4,8}"
  placeholder="Must be lowercase letters between 4-8 characters">
</ef-text-field>
<p id="error-text"></p>

<hr>

<p class="explainer">Show icon example</p>
<label for="feedback">Feedback</label>
<ef-text-field id="feedback" icon="email" placeholder="We appreciate your feedback!"></ef-text-field>
```

::

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sed et rem quibusdam animi hic, iusto, minus magnam illum non laborum, in molestiae commodi sint nemo! Porro nam voluptas, commodi, perferendis aliquid totam delectus rem explicabo hic, facere doloribus incidunt. Repudiandae error porro, similique delectus aut at quidem. Voluptas, voluptatibus.

### Typography

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sed et rem quibusdam animi hic, iusto, minus magnam illum non laborum, in molestiae commodi sint nemo! Porro nam voluptas, commodi, perferendis aliquid totam delectus rem explicabo hic, facere doloribus incidunt. Repudiandae error porro, similique delectus aut at quidem. Voluptas, voluptatibus.
