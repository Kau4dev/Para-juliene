# Vinícius & Juliene — 8 Anos de Amor ∞ 💍❤️

Página web comemorativa, interativa e romântica para celebrar os **8 anos juntos**, feita em HTML5, CSS3 moderno e JavaScript puro, pronta para hospedagem no **GitHub Pages**.

---

## 📁 Estrutura de Arquivos

```
/
├── index.html           # Página principal com envelope 3D, carta, contador e player
├── style.css            # Estilos românticos, animação do envelope e responsividade
├── script.js            # Lógica do envelope, contador, carrossel infinito e player
├── assets/
│   ├── fotos/           # As 15 fotos (foto_01.jpeg até foto_15.jpeg)
│   │   ├── foto_01.jpeg
│   │   ├── ...
│   │   ├── foto_12.jpeg # Foco calibrado nos rostos
│   │   └── foto_15.jpeg
│   ├── musica.mp3       # Áudio da música "Perfume - Belo"
│   └── Belo - Perfume (Ao Vivo)(MP3_160K).mp3
└── README.md            # Este guia de uso e publicação
```

---

## 🎵 Música Configurada

A música **"Perfume - Belo"** já está incluída e configurada no player nativo estilo **Spotify**.
Quando Juliene tocar no selo para abrir a carta, a música iniciará automaticamente!

---

## 🖼️ Ajustes nas Fotos e Carrossel

- **Pasta única:** Todas as 15 fotos estão reunidas em `fotos/` (`foto_01.jpeg` até `foto_15.jpeg`).
- **Foco do rosto na foto 12:** Calibrado especificamente com `object-position: center 6%` para manter os rostos perfeitamente visíveis e em destaque.
- **Carrossel Infinito:** Ao chegar na última foto (15), o carrossel continua avançando suavemente para a foto 1 sem rebobinar todas as fotos de volta.

---

## 🚀 Como Publicar no GitHub Pages (Passo a Passo)

Para que ela possa abrir pelo celular em qualquer lugar:

1. **Crie um repositório no GitHub:**
   - Acesse [github.com/new](https://github.com/new)
   - Nomeie o repositório (ex: `8-anos` ou `juliene`)
   - Deixe como **Public** e clique em **Create repository**.

2. **Suba os arquivos pelo terminal:**
   ```bash
   git init
   git add .
   git commit -m "Carta de amor de 8 anos - Vinicius & Juliene"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   git push -u origin main
   ```

3. **Ative o GitHub Pages:**
   - No seu repositório no GitHub, vá em **Settings** > **Pages** (no menu lateral).
   - Em **Build and deployment** > **Source**, selecione:
     - Branch: `main`
     - Pasta: `/ (root)`
   - Clique em **Save**.

Em instantes o link estará disponível para enviar para ela no WhatsApp! ❤️
