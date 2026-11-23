/* ============================================================
   PAGE: CHANNELS — SATELLITE DISPATCH / EXTERNAL BROADCAST NODES
   ============================================================ */
function renderChannels() {
  var app = document.getElementById('app');
  app.innerHTML =
    '<section class="section">' +
      '<div class="section-label">[04] // SATELLITE DISPATCH &mdash; EXTERNAL BROADCAST NODES</div>' +
      '<div class="section-heading">BROADCAST DIRECTORY</div>' +
      '<div class="section-sub">Each satellite node serves a distinct function in the ecosystem. Long-form documentation lives on YouTube, the curated visual catalog on Instagram and Pinterest, and raw process-first capture on TikTok. Every node is a direct line to the work&mdash;no algorithmic middlemen.</div>' +
      '<div class="channel-grid">' +

        // [YT] YouTube — PRIMARY BROADCAST
        '<article class="channel-card">' +
          '<div class="channel-head">' +
            '<span class="channel-badge">[YT]</span>' +
            '<span class="channel-tag">PRIMARY BROADCAST // LONG-FORM</span>' +
          '</div>' +
          '<h3 class="channel-name">YouTube <span class="channel-handle">(@leoneigh)</span></h3>' +
          '<p class="channel-desc">Full-length choreography rehearsals, vocal progression logs, Sonic Lab breakdowns, and storytelling video essays.</p>' +
          '<a href="https://www.youtube.com/channel/UCvdi1iA8mTj16d0GA8U1zpQ" class="channel-action" target="_blank" rel="noopener noreferrer">OPEN NODE &#8599;</a>' +
        '</article>' +

        // [IG] Instagram — VISUAL CATALOG
        '<article class="channel-card">' +
          '<div class="channel-head">' +
            '<span class="channel-badge">[IG]</span>' +
            '<span class="channel-tag">VISUAL CATALOG // CURATED</span>' +
          '</div>' +
          '<h3 class="channel-name">Instagram <span class="channel-handle">(@leoneigh_unfiltered)</span></h3>' +
          '<p class="channel-desc">Sartorial Archive lookbooks, high-contrast movement stills, studio aesthetic boards, and commentary reels.</p>' +
          '<a href="https://www.instagram.com/leoneighunfiltered/" class="channel-action" target="_blank" rel="noopener noreferrer">OPEN NODE &#8599;</a>' +
        '</article>' +

        // [PIN] Pinterest — Visual Inspiration Board
        '<article class="channel-card">' +
          '<div class="channel-head">' +
            '<span class="channel-badge">[PIN]</span>' +
            '<span class="channel-tag">VISUAL REFERENCE // INSPIRATION</span>' +
          '</div>' +
          '<h3 class="channel-name">Pinterest <span class="channel-handle">(@leoneighunfiltered)</span></h3>' +
          '<p class="channel-desc">Curated mood boards, visual references, fashion direction, movement inspiration, and creative concepts.</p>' +
          '<a href="https://www.pinterest.com/leoneighunfiltered/" class="channel-action" target="_blank" rel="noopener noreferrer">OPEN NODE &#8599;</a>' +
        '</article>' +

        // [TT] TikTok — Main
        '<article class="channel-card">' +
          '<div class="channel-head">' +
            '<span class="channel-badge">[TT]</span>' +
            '<span class="channel-tag">LIVE FEED // UNFILTERED</span>' +
          '</div>' +
          '<h3 class="channel-name">TikTok &mdash; Main <span class="channel-handle">(@leoneigh_unfiltered)</span></h3>' +
          '<p class="channel-desc">Raw rehearsal clips, micro-drills, cultural commentary hooks, and work-in-progress Sonic Lab loops.</p>' +
          '<a href="https://www.tiktok.com/@leoneigh.unfilter" class="channel-action" target="_blank" rel="noopener noreferrer">OPEN NODE &#8599;</a>' +
        '</article>' +

      '</div>' +
    '</section>' +

    // [LD] CROSS-LINK BANNER
    '<section class="section">' +
      '<div class="ld-bridge">' +
        '<span class="ld-bridge-label">FOR SOFTWARE ARCHITECTURE, CUSTOM AUDIO SYSTEMS, AND WEB INFRASTRUCTURE:</span>' +
        '<a href="https://leoneighdigital.github.io/leoneigh-digital/" target="_blank" rel="noopener noreferrer" class="ld-bridge-link"><span class="bracket">[</span>LD<span class="bracket">]</span> LEONEIGH DIGITAL &mdash; Systems &amp; Infrastructure <span class="arrow">&#8599;</span></a>' +
      '</div>' +
    '</section>';
}