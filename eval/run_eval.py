# -*- coding: utf-8 -*-
import pathlib,subprocess,sys
root=pathlib.Path(__file__).resolve().parents[1]
sys.exit(subprocess.run(['node','--test','eval/core.test.js'],cwd=str(root)).returncode)
