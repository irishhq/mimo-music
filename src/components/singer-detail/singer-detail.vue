<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { getSongVkey } from 'api/song'
import MusicList from 'components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avator
    },
    ...mapGetters([
      'singer'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.status === ERR_OK) {
          this.songs = this._formatSongs(res.data.hotSongs)
        }
      })
    },
    _formatSongs(list) {
      let result = []
      list.forEach((item) => {
        // 解构赋值-拿到item 下的 musicData 列表数据
        let {...musicData} = item
        // 更新-加上vkey
        // getSongVkey(musicData.songmid).then(res => {
        //   const vkey = res.data.items[0].vkey;
        //   if (musicData.songid && musicData.albummid) {
        //     result.push(createSong(musicData, vkey))
        //   }
        // })
        result.push(createSong(musicData))
      })
      return result
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
