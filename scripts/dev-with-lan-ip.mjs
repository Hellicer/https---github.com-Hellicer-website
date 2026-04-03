import os from 'node:os'
import { spawn } from 'node:child_process'

const PORT = process.env.PORT || '3000'

function getLanIp() {
    const interfaces = os.networkInterfaces()

    for (const entries of Object.values(interfaces)) {
        if (!entries) continue

        for (const net of entries) {
            const isIpv4 = net.family === 'IPv4'
            const isInternal = net.internal

            if (isIpv4 && !isInternal) {
                return net.address
            }
        }
    }

    return null
}

const lanIp = getLanIp()

console.log('Starting Next.js dev server...')
console.log(`- Local:   http://localhost:${PORT}`)
if (lanIp) {
    console.log(`- Phone:   http://${lanIp}:${PORT}`)
} else {
    console.log(`- Phone:   IP not found. Use: ipconfig`)
}
console.log('')

const child =
    process.platform === 'win32'
        ? spawn('cmd.exe', ['/c', 'next', 'dev', '-H', '0.0.0.0', '-p', PORT], {
              stdio: 'inherit',
          })
        : spawn('next', ['dev', '-H', '0.0.0.0', '-p', PORT], {
              stdio: 'inherit',
          })

child.on('exit', code => process.exit(code ?? 0))
child.on('error', err => {
    console.error('Failed to start Next.js:', err)
    process.exit(1)
})
