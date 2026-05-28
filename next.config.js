# Crear el archivo next.config.js correcto
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // ← Muy importante para Cloudflare
  images: {
    unoptimized: true,        // ← Obligatorio para static export
  },
};

export default nextConfig;
EOF

# Verificar que se creó correctamente
ls -la next.config*

# Subir los cambios a GitHub (esto disparará el nuevo build en Cloudflare)
git add next.config.js
git commit -m "fix: next.config.js for Cloudflare Pages static export"
git push