from setuptools import setup
import os
import sys

# Get the base directory
here = os.path.abspath(os.path.dirname(__file__))

# Get the long description from the README file
with open(os.path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name="AmixMusic",
    version="1.0.0",
    description="A lightweight, customizable music player",
    long_description=long_description,
    long_description_content_type='text/markdown',
    url="https://github.com/yourusername/amixmusic",
    author="Your Name",
    author_email="your.email@example.com",
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: End Users/Desktop',
        'Topic :: Multimedia :: Sound/Audio :: Players',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
    ],
    keywords='music player audio playlist',
    packages=['amixmusic'],
    python_requires='>=3.10',
    install_requires=[
        'PyQt6==6.4.0',
        'mutagen==1.47.0',
        'python-dotenv==1.0.0'
    ],
    entry_points={
        'console_scripts': [
            'amixmusic=desktop_app:main',
        ],
    },
    project_urls={
        'Bug Reports': 'https://github.com/yourusername/amixmusic/issues',
        'Source': 'https://github.com/yourusername/amixmusic',
    },
)
