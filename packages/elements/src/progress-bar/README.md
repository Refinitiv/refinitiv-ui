# Progress Bar

```live(preview)
<style>
.red {
  color: #F44336;
}
.pink {
  color: #E91E63;
}
.purple {
  color: #9C27B0;
}
.indigo {
  color: #3F51B5;
}
.navy {
  color: #334e96;
}
ef-progress-bar {
  margin-bottom: 10px;
  max-width: 600px;
}
</style>
<script type="text/javascript">
var val;
var bar;
var bars = document.body.querySelectorAll('ef-progress-bar');
var i = 0;
var shift = 0;
var max = bars.length;
setInterval(function() {
  val = 100 / max * ((i + shift) % max + 1);
  bar = bars[i++ % max];
  bar.value = val;
  if (i % max === 0) {
    shift++;
  }
}, 333);
</script>
<ef-progress-bar class="red"></ef-progress-bar>
<ef-progress-bar class="pink"></ef-progress-bar>
<ef-progress-bar class="purple"></ef-progress-bar>
<ef-progress-bar class="indigo"></ef-progress-bar>
<ef-progress-bar class="navy"></ef-progress-bar>
```

`ef-progress-bar` is a simple visualization to display a single bar. It takes values between 0-100 and uses it as a percentage to fill the bar.

### Set bar length
Length of bar can be set by using `value` attribute. The value can be any decimals between 0 to 100.

```live
<style>
  html {
    padding-top: 10px;
    margin-bottom: 10px;
  }
  ef-progress-bar {
    margin-bottom: 10px;
  }
</style>
<ef-progress-bar value="100"></ef-progress-bar>
<ef-progress-bar value="75"></ef-progress-bar>
<ef-progress-bar value="50"></ef-progress-bar>
<ef-progress-bar value="25"></ef-progress-bar>
```

```html
<ef-progress-bar value="100"></ef-progress-bar>
<ef-progress-bar value="75"></ef-progress-bar>
<ef-progress-bar value="50"></ef-progress-bar>
<ef-progress-bar value="25"></ef-progress-bar>
```

### Show label

You can set the text to `label` attribute to show any text at the end of bar. To prevent a label going outside a container apply `margin-right` to the `ef-progress-bar`.

```css
ef-progress-bar {
  margin-right: 45px;
}
```
```html
<ef-progress-bar value="100" label="100"></ef-progress-bar>
```

```live
<style>
  html {
    padding-top: 10px;
    padding-bottom: 45px
  }
  ef-progress-bar {
    margin-right: 45px;
    margin-bottom: 45px
  }
</style>
<ef-progress-bar value="100" label="100"></ef-progress-bar>
```

### Customize height and color
Bar color and height have default value from theme, but you can override by CSS.

```live
<style>
  ef-progress-bar {
    height: 16px;
  }
  .highlighted {
    color: #000000;
  }
  html {
    padding-top: 10px;
    padding-bottom: 45px
  }
  ef-progress-bar {
    margin-right: 45px;
    margin-bottom: 10px
  }  
</style>
<ef-progress-bar value="20" label="Potato Croquettes"></ef-progress-bar>
<ef-progress-bar value="50" label="Hamburger"></ef-progress-bar>
<ef-progress-bar class="highlighted" value="70" label="Sushi"></ef-progress-bar>
<ef-progress-bar value="35" label="Toast"></ef-progress-bar>
```

```css
ef-progress-bar {
  height: 16px;
}
.highlighted {
  color: #000000;
}
```
```html
<ef-progress-bar value="20" label="Potato Croquettes"></ef-progress-bar>
<ef-progress-bar value="50" label="Hamburger"></ef-progress-bar>
<ef-progress-bar class="highlighted" value="70" label="Sushi"></ef-progress-bar>
<ef-progress-bar value="65" label="Toast"></ef-progress-bar>
```

### Label slot
`label` attribute supports only text. You can use slot to provide any contents e.g. icons or customize your label colour.

You may have to add some CSS to your content, so it looks nice.

```live
<style>
  ef-progress-bar {
    margin-bottom: 10px;
  }
  ef-progress-bar .thumb {
    position: absolute;
    top: -8px;
  }
</style>
<ef-progress-bar value="85">
  <ef-icon class="thumb" slot="label" icon="like-empty"></ef-icon>
</ef-progress-bar>
<ef-progress-bar value="15">
  <ef-icon class="thumb" slot="label" icon="dislike-empty"></ef-icon>
</ef-progress-bar>
```

```css
ef-progress-bar .thumb {
  position: absolute;
  top: -8px;
}
```

```html
<ef-progress-bar value="85">
  <ef-icon class="thumb" slot="label" icon="like-empty"></ef-icon>
</ef-progress-bar>
<ef-progress-bar value="15">
  <ef-icon class="thumb" slot="label" icon="dislike-empty"></ef-icon>
</ef-progress-bar>
```
