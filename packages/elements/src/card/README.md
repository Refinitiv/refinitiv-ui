# Card

```live(preview)
<ef-card style="margin:10px" header="Vlad the vaccinator: Dracula's castle lures visitors with COVID-19 jabs" footer="Source: Reuters">
    <img style="width:100%;height:auto;" src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/FCGFMWQNF5MAZHNHQFVP5LUV3M.jpg">
    <div style="padding:10px 0">Visitors to Dracula's castle are more likely to find puncture marks in their arms than their necks this month, after medics set up a COVID-19 vaccination centre at the Transylvanian attraction.</div>
</ef-card>
```

`ef-card` is a versatile container that can display contents inside the card frame.

### Basic usage
You can wrap any content with `ef-card`. Header and footer can be set by using `header` and `footer` attributes.

```live
<ef-card style="margin: 10px;" header="NASA spacecraft starts trip back to Earth after collecting asteroid samples" footer="Source: Reuters" >
    <p>A NASA spacecraft, which scientists believe has collected samples from an asteroid, began its two-year journey back to Earth on Monday.</p>
    <p>NASA OSIRIS-REx spacecraft is attempting to complete a mission to visit Bennu, a skyscraper-sized asteroid some 200 million miles (320 million km) from Earth, survey the surface, collect samples and deliver them back to Earth.</p>
</ef-card>
```

```html
<ef-card
    header="NASA spacecraft starts trip back to Earth after collecting asteroid samples"
    footer="Source: Reuters" >
        <p>A NASA spacecraft, which scientists believe has collected samples from an asteroid, began its two-year journey back to Earth on Monday.</p>
        <p>NASA's OSIRIS-REx spacecraft is attempting to complete a mission to visit Bennu, a skyscraper-sized asteroid some 200 million miles (320 million km) from Earth, survey the surface, collect samples and deliver them back to Earth.</p>
</ef-card>
```

### Card Menu

`ef-card` can show menu by passing the `data` through the property by using `config` property. The schema of `data` is same as ([Overlay Menu](https://elf.int.refinitiv.com/elements/overlay-menu.html))

Use `item-trigger` event to detect when users click on any menu item.

```live
<ef-card style="margin:10px;" id="card" header="Chart">
    <ef-interactive-chart id="chart"></ef-interactive-chart>
</ef-card>

<script>
    var card = document.getElementById('card');
    var chart = document.getElementById('chart');
    card.config = {
        menu: {
            data: [
                { label: 'Price', value: 'price' },
                { label: 'Percentage',value: 'percent' }
            ]
        }
    };

    chart.config = 
    {
        options: {
            priceScale: {
                mode: 1
            }
        },
        series: [
        {
            symbol: 'Tesla',
            type: "area",
            data: [
                { time: "2021-12-22", value: 32.51 },
                { time: "2021-12-23", value: 31.11 },
                { time: "2021-12-24", value: 27.02 },
                { time: "2021-12-25", value: 27.32 },
                { time: "2021-12-26", value: 25.17 },
                { time: "2021-12-27", value: 28.89 },
                { time: "2021-12-28", value: 25.46 },
                { time: "2021-12-29", value: 23.92 },
                { time: "2021-12-30", value: 22.68 },
                { time: "2021-12-31", value: 22.67 }
            ]
        },
        {
            symbol: 'TSLA Futures',
            type: "line",
            data: [
                { time: "2021-12-22", value: 22.51 },
                { time: "2021-12-23", value: 11.11 },
                { time: "2021-12-24", value: 37.02 },
                { time: "2021-12-25", value: 17.32 },
                { time: "2021-12-26", value: 5.17 },
                { time: "2021-12-27", value: 18.89 },
                { time: "2021-12-28", value: 15.46 },
                { time: "2021-12-29", value: 13.92 },
                { time: "2021-12-30", value: 32.68 },
                { time: "2021-12-31", value: 12.67 }
            ]
        }
        ]
    }

    card.addEventListener('item-trigger', function (e) {
        var value = e.detail.value;
        var newConfig = JSON.parse(JSON.stringify(chart.config));
        newConfig.options.priceScale.mode = value === 'percent' ? 2 : 1;
        chart.config = newConfig;
        card.menu.opened = false; // close menu after users selected
    });
</script>
```

```html
<ef-card id="card" header="Chart">
    <ef-interactive-chart id="chart"></ef-interactive-chart>
</ef-card>
```

```javascript
var card = document.getElementById('card');
var chart = document.getElementById('chart');
card.config = {
    menu: {
        data: [
            { label: 'Price', value: 'price' },
            { label: 'Percentage',value: 'percent' }
        ]
    }
};

chart.config = 
{
...
}

card.addEventListener('item-trigger', function (e) {
    var value = e.detail.value;
    var newConfig = JSON.parse(JSON.stringify(chart.config));
    newConfig.options.priceScale.mode = value === 'percent' ? 2 : 1;
    chart.config = newConfig;
    card.menu.opened = false; // close menu after users selected
});

```
