---
title: Overview
layout: default.njk
---

<style>

.overview{
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
  gap: 10px;
}

.img-wrap{
  width: 200px;
  height: 200px;
  background-color: #efefef;
}

img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}

figcaption{
  padding-top: 10px;
}

table th{
  text-align: left;
  max-width: 300px;
}

th, td{
  border-top: solid 1px #aaa;
}

</style>

<h2>Masterpieces</h2>

<ul class="overview">
{%- for item in collections.masterpiecesDE -%}
  <li class="overview-item">
  <a href="de/{{item.metadata.id}}">
    <figure>
      <div class="img-wrap">
        <img src="{{item.media.images[0].sizes.small.src}}">
      </div>
      <figcaption>{{item.metadata.title}}<br>{{item.metadata.id}}<br>{{item.sortingInfo.year}}-{{item.sortingInfo.position}}</figcaption>
    </figure>
  </a>
  </li>
{%- endfor -%}
</ul>

