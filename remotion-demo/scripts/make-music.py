"""Synthesize a short royalty-free background loop (Am-F-C-G, 100 BPM).

Pure standard library so it runs anywhere: python3 scripts/make-music.py
"""
import math
import random
import struct
import wave

SR = 44100
BPM = 100
BEAT = 60 / BPM
DURATION = 17.0
OUT = "public/music/upbeat-loop.wav"

CHORDS = [  # (bass root, pad notes) as MIDI numbers
    (45, [57, 60, 64]),  # Am
    (41, [53, 57, 60]),  # F
    (48, [55, 60, 64]),  # C
    (43, [55, 59, 62]),  # G
]


def hz(midi):
    return 440 * 2 ** ((midi - 69) / 12)


n = int(SR * DURATION)
buf = [0.0] * n
random.seed(7)


def add(start, length, fn, gain):
    s = int(start * SR)
    for i in range(min(int(length * SR), n - s)):
        buf[s + i] += gain * fn(i / SR)


bar = 4 * BEAT
t = 0.0
step = 0
while t < DURATION:
    root, notes = CHORDS[step % len(CHORDS)]
    # Soft pad: slightly detuned sines with slow attack and release.
    for note in notes:
        for detune in (-0.15, 0.15):
            f = hz(note) * 2 ** (detune / 12)
            add(t, bar, lambda x, f=f: math.sin(2 * math.pi * f * x)
                * min(1, x / 0.25) * min(1, (bar - x) / 0.3), 0.05)
    for b in range(4):
        bt = t + b * BEAT
        # Plucked bass on every beat.
        fb = hz(root)
        add(bt, BEAT, lambda x, fb=fb: math.sin(2 * math.pi * fb * x)
            * math.exp(-x * 5), 0.35)
        # Kick on beats 1 and 3.
        if b % 2 == 0:
            add(bt, 0.35, lambda x: math.sin(2 * math.pi * (50 * x + 100 * (1 - math.exp(-x * 30)) / 30))
                * math.exp(-x * 9), 0.7)
        # Clap-like snare on beats 2 and 4.
        else:
            add(bt, 0.2, lambda x: random.uniform(-1, 1) * math.exp(-x * 25), 0.18)
        # Off-beat hi-hat.
        add(bt + BEAT / 2, 0.06, lambda x: random.uniform(-1, 1) * math.exp(-x * 80), 0.08)
        # Eighth-note arpeggio over the chord.
        for e in range(2):
            fa = hz(notes[(b * 2 + e) % 3] + 12)
            add(bt + e * BEAT / 2, BEAT / 2, lambda x, fa=fa: (
                2 / math.pi * math.asin(math.sin(2 * math.pi * fa * x))) * math.exp(-x * 9), 0.07)
    t += bar
    step += 1

peak = max(abs(v) for v in buf)
fade_in, fade_out = int(0.3 * SR), int(1.5 * SR)
with wave.open(OUT, "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    frames = bytearray()
    for i, v in enumerate(buf):
        g = min(1, i / fade_in, (n - i) / fade_out)
        frames += struct.pack("<h", int(v / peak * 0.85 * g * 32767))
    w.writeframes(bytes(frames))
print("wrote", OUT)
