
import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface StreamPlayerProps {
  thumbnail: string;
  isLive?: boolean;
  streamerName?: string;
  gameTitle?: string;
}

export function StreamPlayer({ thumbnail, isLive = true, streamerName = "Dexplay Streamer", gameTitle = "Decimated" }: StreamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (videoRef.current) {
      videoRef.current.volume = volumeValue / 100;
    }
    setIsMuted(volumeValue === 0);
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume / 100;
      } else {
        videoRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };
  
  // Show/hide controls on hover
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => setShowControls(false));
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", () => setShowControls(false));
      }
      clearTimeout(timeout);
    };
  }, []);
  
  // Update progress bar
  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(isNaN(currentProgress) ? 0 : currentProgress);
      }
    };
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateProgress);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-black video-container border border-white/5"
      ref={containerRef}
    >
      {/* Video Preview (in a real app, this would be an actual video stream) */}
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={thumbnail} 
            alt="Stream thumbnail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-20 h-20 rounded-full bg-dexplay-purple/20 hover:bg-dexplay-purple/30 text-white"
              onClick={togglePlay}
            >
              <Play className="h-12 w-12 fill-white" />
            </Button>
          </div>
          {isLive && (
            <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
              <span>LIVE</span>
            </div>
          )}
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full"
          playsInline
          onClick={togglePlay}
        >
          <source 
            src="https://asset-2.stvid.io/assets/hal_9000-Z1m7.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Stream Information Overlay */}
      <div className="absolute top-4 left-4 z-10">
        {isLive && (
          <div className="bg-red-600 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1 mb-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
            <span>LIVE</span>
          </div>
        )}
        <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1">
          <p className="font-semibold text-white">{streamerName}</p>
          <p className="text-xs text-gray-300">Playing {gameTitle}</p>
        </div>
      </div>

      {/* Video Controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Progress bar */}
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          className="mb-3 cursor-pointer"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10" 
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10" 
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10" 
              onClick={() => {}}
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10" 
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
