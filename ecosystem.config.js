module.exports = {
    apps: [{
        name: "evar-charge",
        script: "npm",
        exec_mode: 'cluster',
        instances: 1,
        args: ['start'],
        env: {
            NODE_ENV: "dev",
        },
        env_production: {
            NODE_ENV: "prod",
        }
    }]
}
// 환경변수 실행하는방법
// pm2 start ecosystem.config.js --env production