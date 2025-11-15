# ----------------------------
# NPM Commands
# ----------------------------

function npm_dev { 
    # title "NPM Run Dev"
    # description "Run the development server using npm run dev."
    npm run dev 
}

function npm_build { 
    # title "NPM Run Build"
    # description "Create a production build using npm run build."
    npm run build 
}

function npm_test { 
    # title "NPM Test"
    # description "Run test scripts using npm test."
    npm test 
}

function npm_install { 
    # title "NPM Install"
    # description "Install all project dependencies using npm install."
    npm install 
}

# ----------------------------
# Laravel Inertia + React/Vue Commands
# ----------------------------

function npm_inertia_react { 
    # title "NPM Inertia React Install"
    # description "Install @inertiajs/react for Laravel Inertia React setup."
    npm install @inertiajs/react 
}

function npm_inertia_react_all { 
    # title "NPM Inertia React Full Install"
    # description "Install Inertia React + Vite React Plugin + React DOM."
    npm install @inertiajs/react @vitejs/plugin-react react-dom 
}

function npm_inertia_react_types { 
    # title "NPM Inertia React Types Install"
    # description "Install TypeScript types for React & React DOM."
    npm install --save-dev @types/react @types/react-dom 
}

function npm_inertia_vue { 
    # title "NPM Inertia Vue Install"
    # description "Install @inertiajs/vue3 for Laravel Inertia Vue setup."
    npm install @inertiajs/vue3 
}
