const { getGlobal } = require('remote')

const gs144 = require('genoset-male')
const gs101 = require('genoset-101') // lactose tolerant
const gs119 = require('genoset-119') // 6.5x increased risk for breast cancer
const gs122 = require('genoset-122') // increase risk of baldness
const gs137 = require('genoset-137') // ~5.7x increased risk for thyroid cancer
const gs150 = require('genoset-150') // "rapid metabolizer" phenotype for CYP2C19
const gs152 = require('genoset-152') // "poor metabolizer" phenotype for CYP2C19
const gs159 = require('genoset-159') // "rapid metabolizer" phenotype for CYP1A2
const gs191 = require('genoset-191') // impaired NSAID metabolism
const gs209 = require('genoset-209') // 1.7x increase risk panic disorder
const gs211 = require('genoset-211') // problem metabolizing ethanol
const gs216 = require('genoset-216') // increased risk of Alzheimer's and heart disease, but is protective against Hepatitis C-induced liver damage
const gs228 = require('genoset-228') // sickle cell anemia
const gs243 = require('genoset-243') // increased risk prostate cancer patients dying
const gs248 = require('genoset-248') // lower risk parkinsons
const gs291 = require('genoset-291') // lower heart attack risk
const myDna = getGlobal('dnaFilePath')
// there has to be a better way :|
module.exports = {
    gs144: {
      test: gs144,
      description: "Male"
    },
    gs101: {
      test: gs101,
      description: "lactose tolerant"

    },
    gs119: {
      test: gs119,
      description: "6.5x increased risk for breast cancer"

    },
    gs122: {
      test: gs122,
      description: "increase risk of baldness"

    },
    gs137: {
      test: gs137,
      description: "~5.7x increased risk for thyroid cancer"

    },
    gs150: {
      test: gs150,
      description: "'rapid metabolizer' phenotype for CYP2C19"

    },
    gs152: {
      test: gs152,
      description: "'poor metabolizer' phenotype for CYP2C19"

    },
    gs159: {
      test: gs159,
      description: "'rapid metabolizer' phenotype for CYP1A2"

    },
    gs191: {
      test: gs191,
      description: "impaired NSAID metabolism"

    },
    gs209: {
      test: gs209,
      description: "1.7x increase risk panic disorder"

    },
    gs211: {
      test: gs211,
      description: "problem metabolizing ethanol"

    },
    gs216: {
      test: gs216,
      description: "increased risk of Alzheimer's and heart disease, but is protective against Hepatitis C-induced liver damage"

    },
    gs228: {
      test: gs228,
      description: "sickle cell anemia"

    },
    gs243: {
      test: gs243,
      description: "increased risk prostate cancer patients dying"

    },
    gs248: {
      test: gs248,
      description: "lower risk parkinsons"

    },
    gs291: {
      test: gs291,
      description: "lower heart attack risk"

    }
  }
