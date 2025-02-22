<!-- BEGIN_DOCS -->
<div align="center">

<a name="readme-top"></a>

<img src="https://user-images.githubusercontent.com/25841814/79395484-5081ae80-7fac-11ea-9e27-ac91472e31dd.png" width="500">

Hello Human 👽! Bem-vindo ao meu repositório 👋

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://www.conventionalcommits.org/en/v1.0.0/)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://semantic-release.gitbook.io/semantic-release/usage/configuration)
[![Built with Devbox](https://jetpack.io/img/devbox/shield_galaxy.svg)](https://jetpack.io/devbox/docs/contributor-quickstart/)

Você é diurno 🐤 ou noturno 🦉? Vamos dar uma olhada 🧐!

Inspirado pelo projeto [productive-box](https://github.com/maxam2017/productive-box) do @maxam2017.

</div>

# Sumário

<details>
  <summary><strong>Expandir</strong></summary>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
- [Setup](#setup)
  - [Prep work](#prep-work)
  - [Project setup](#project-setup)
- [Referências](#refer%C3%AAncias)
- [Contribuição](#contribui%C3%A7%C3%A3o)
- [Versionamento](#versionamento)
- [Troubleshooting](#troubleshooting)
- [Show your support](#show-your-support)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

</details>

# Overview

Esse projeto usa a API graphQL do GitHub para obter os históricos de commits de um usuário e colocar de forma customizada em um Gist do GitHub.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Setup

## Prep work

1. Crie um novo GitHub Gist público (https://gist.github.com/)
1. Crie um token com o escopo `gist` e `repo` e copie-o. (https://github.com/settings/tokens/new)
   > - habilitar o escopo `repo` parece **PERIGOSO**<br/>
   > - mas essa ação do GitHub só acessa o registro de data e hora do commit no repositório com o qual você contribuiu.

## Project setup

1. Faça um fork desse repositório.
1. Habilite as "Actions" (Ações) de sua bifurcação e clique no botão "enable" (ativar).
1. Edite as variáveis utilizadas na pipeline `.github/workflows/schedule.yml`:
   - **GIST_ID:** A parte do ID da url do seu gist.
   - **TIMEZONE:** O fuso horário de sua localização, por exemplo, `Asia/Taipei` para Taiwan, `America/New_York` para a América em Nova York, etc.
1. Acesse o repositório **Settings > Secrets**
1. Adicione as seguintes variáveis de ambiente:
   - **GH_TOKEN:** O token do GitHub gerado acima.
1. [Fixe o Gist recém-criado](https://help.github.com/en/github/setting-up-and-managing-your-github-profile/pinning-items-to-your-profile)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Referências

Links relevantes para esse projeto:

- https://github.com/techinpark/productive-box

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Contribuição

Gostaria de contribuir? Isso é ótimo! Temos um guia de contribuição para te ajudar. Clique [aqui](CONTRIBUTING.md) para lê-lo.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Versionamento

Para verificar o histórico de mudanças do projeto, acesse o arquivo [**CHANGELOG.md**](CHANGELOG.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Troubleshooting

Se você tiver algum problema, [abra uma issue nesse projeto](https://github.com/homelabsz/helm-charts/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Show your support

<div align="center">

Dê uma ⭐️ para esse projeto se ele te ajudou!

<img alt="gif-footer" src="https://github.com/lpsm-dev/lpsm-dev/blob/main/.github/assets/yoda.gif" width="225"/>

<br>
<br>

Feito com 💜 por [mim](https://github.com/lpsm-dev) :wave: inspirado no [readme-md-generator](https://github.com/kefranabg/readme-md-generator)

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- END_DOCS -->
