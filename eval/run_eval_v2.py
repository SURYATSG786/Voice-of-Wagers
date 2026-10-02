# -*- coding: utf-8 -*-
"""Run reproducible evaluations using the same JavaScript modules as the app."""
import pathlib,subprocess,sys
root=pathlib.Path(__file__).resolve().parents[1]
sys.exit(subprocess.run(['node','eval/report.js'],cwd=str(root)).returncode)
