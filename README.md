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
│   ├── fotos/           # As 19 fotos (foto_01.jpeg até foto_19.jpeg)
│   │   ├── foto_01.jpeg
│   │   ├── ...
│   │   ├── foto_11.jpeg # Vestido vermelho & camisa preta
│   │   ├── foto_12.jpeg # Foco calibrado nos rostos (roupa branca)
│   │   └── foto_19.jpeg # Brinde do casal
│   └── musica.mp3       # Áudio da música "Perfume - Belo"
└── README.md            # Este guia de uso e publicação
```

---

## 🎵 Música Otimizada para iPhone (iOS Safari & Chrome)

O player agora está 100% configurado para funcionar em qualquer dispositivo móvel, incluindo iPhones no Safari e Chrome.
Quando Juliene tocar no selo para abrir a carta, a música iniciará automaticamente!

---

## 🖼️ Ajustes nas Fotos e Carrossel

- **19 fotos organizadas:** Todas as fotos estão reunidas e padronizadas em `assets/fotos/` (`foto_01.jpeg` até `foto_19.jpeg`).
- **Foco do rosto na foto 12:** Calibrado especificamente com `object-position: center 6%`.
- **Foco do rosto na foto 11:** Calibrado especificamente com `object-position: center 8%`.
- **Carrossel Infinito:** Looping suave da foto 19 diretamente para a foto 1.

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
